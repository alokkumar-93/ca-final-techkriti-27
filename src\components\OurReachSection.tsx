import React, { useEffect, useState, useRef } from 'react';
import { Globe, GraduationCap, Users, Award } from 'lucide-react';

interface MetricItem {
  id: string;
  targetValue: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}

const METRICS: MetricItem[] = [
  {
    id: 'ambassadors',
    targetValue: 22000,
    suffix: 'K+',
    label: 'COLLEGE AMBASSADORS',
    sublabel: 'Pan-India & International Network',
    icon: Users
  },
  {
    id: 'indian-universities',
    targetValue: 2500,
    suffix: '+',
    label: 'INDIAN UNIVERSITIES',
    sublabel: 'Across 28 States & UTs',
    icon: GraduationCap
  },
  {
    id: 'international-universities',
    targetValue: 500,
    suffix: '+',
    label: 'GLOBAL UNIVERSITIES',
    sublabel: 'Worldwide Representation',
    icon: Globe
  },
  {
    id: 'footfall',
    targetValue: 50000,
    suffix: '+',
    label: 'FEST FOOTFALL',
    sublabel: 'Asia\'s Largest Tech Festival',
    icon: Award
  }
];

export const OurReachSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reach"
      style={{
        position: 'relative',
        padding: '5.5rem 1.5rem',
        maxWidth: '85rem',
        margin: '0 auto',
        zIndex: 10
      }}
      className="gpu-section"
    >
      {/* Background Cyan Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '500px',
          opacity: 0.35,
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(59, 130, 246, 0.25) 50%, rgba(5, 3, 11, 0.95) 80%)',
          filter: 'blur(110px)',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      {/* Header matching exact site-wide section styling */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="reveal-3d-pop">
        <span 
          className="font-tech-sub"
          style={{ 
            display: 'inline-block',
            padding: '0.45rem 1.35rem', 
            borderRadius: '9999px', 
            fontSize: '0.75rem', 
            fontWeight: 800, 
            color: '#38bdf8', 
            textTransform: 'uppercase', 
            letterSpacing: '0.2em',
            background: 'rgba(56, 189, 248, 0.14)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            boxShadow: '0 0 15px rgba(56, 189, 248, 0.25)',
            marginBottom: '1rem'
          }}
        >
          GLOBAL IMPACT & NUMBERS
        </span>

        <h2 
          className="font-tech-heading"
          style={{ 
            fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', 
            fontWeight: 800, 
            color: '#ffffff', 
            margin: '0 0 1.25rem', 
            letterSpacing: '0.04em' 
          }}
        >
          OUR <span style={{ color: '#38bdf8', textShadow: '0 0 25px rgba(56, 189, 248, 0.6)' }}>REACH</span>
        </h2>

        <p 
          style={{ 
            color: 'hsl(40 6% 85%)', 
            fontSize: '1.1rem', 
            maxWidth: '44rem', 
            margin: '0 auto',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          Connecting thousands of campuses, student leaders, and innovator contingents under Techkriti, IIT Kanpur.
        </p>
      </div>

      {/* Grid of 4 Animated Counter Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem'
        }}
      >
        {METRICS.map((metric, idx) => (
          <MetricCard 
            key={metric.id} 
            metric={metric} 
            isVisible={isVisible} 
            delayIndex={idx}
          />
        ))}
      </div>
    </section>
  );
};

// Single Metric Card Component
const MetricCard: React.FC<{ metric: MetricItem; isVisible: boolean; delayIndex: number }> = ({
  metric,
  isVisible,
  delayIndex
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const Icon = metric.icon;

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animId: number;
    const duration = 2200; // 2.2s count up duration

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth Ease-Out Expo curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = Math.floor(easeProgress * metric.targetValue);

      setDisplayValue(currentValue);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    // Stagger start delay slightly for each card
    const timer = setTimeout(() => {
      animId = requestAnimationFrame(step);
    }, delayIndex * 120);

    return () => {
      clearTimeout(timer);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isVisible, metric.targetValue, delayIndex]);

  // Format value display (e.g., 22000 -> 22K+, 2500 -> 2,500+)
  const formatNumber = (num: number, metricId: string) => {
    if (metricId === 'ambassadors') {
      const kValue = (num / 1000).toFixed(num >= 10000 ? 0 : 1);
      return `${kValue}K+`;
    }
    return `${num.toLocaleString()}+`;
  };

  return (
    <div
      className={`liquid-glass ${delayIndex % 2 === 0 ? 'reveal-3d-left' : 'reveal-3d-right'}`}
      style={{
        borderRadius: '1.5rem',
        padding: '2.25rem 1.75rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid rgba(56, 189, 248, 0.35)',
        background: 'linear-gradient(145deg, rgba(8, 20, 42, 0.95), rgba(5, 10, 24, 0.98))',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.15)',
        transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        cursor: 'default'
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = 'translateY(-6px)';
        el.style.borderColor = 'rgba(56, 189, 248, 0.6)';
        el.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(56, 189, 248, 0.3)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = 'translateY(0)';
        el.style.borderColor = 'rgba(56, 189, 248, 0.35)';
        el.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.15)';
      }}
    >
      {/* Icon Circle */}
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '1rem',
          background: 'rgba(56, 189, 248, 0.14)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          color: '#38bdf8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)'
        }}
      >
        <Icon size={28} />
      </div>

      {/* Animated Counter Metric Number matching tech font */}
      <div
        className="font-tech-heading"
        style={{
          fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)',
          fontWeight: 900,
          color: '#ffffff',
          lineHeight: 1,
          letterSpacing: '0.02em',
          marginBottom: '0.75rem',
          textShadow: '0 0 25px rgba(56, 189, 248, 0.6)'
        }}
      >
        {formatNumber(displayValue, metric.id)}
      </div>

      {/* Metric Label */}
      <div
        className="font-tech-sub"
        style={{
          fontSize: '0.85rem',
          fontWeight: 800,
          color: '#38bdf8',
          letterSpacing: '0.15em',
          marginBottom: '0.4rem'
        }}
      >
        {metric.label}
      </div>

      {/* Sublabel Description */}
      <div
        style={{
          fontSize: '0.85rem',
          color: 'hsl(40 6% 80%)',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        {metric.sublabel}
      </div>
    </div>
  );
};
