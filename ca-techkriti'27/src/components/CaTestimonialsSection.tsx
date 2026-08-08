import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, User, Quote, Star, Award } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  college: string;
  quote: string;
  rating: number;
  year: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Krish Shivhare",
    role: "Lead Campus Ambassador",
    college: "IIT Kanpur Contingent",
    quote: "The Techkriti Campus Ambassador Program has been a blessing to me, and I'm grateful for the opportunity. I learned a lot about event promotion, leadership, and how to provide attendees with the most up-to-date information possible.",
    rating: 5,
    year: "Techkriti'24"
  },
  {
    id: 2,
    name: "Ananya Sharma",
    role: "Senior Campus Ambassador",
    college: "Delhi Technological University (DTU)",
    quote: "Being a CA for Techkriti gave me hands-on corporate outreach experience and helped me build confidence. The perks, networking with tech leaders, and official Certificate from IIT Kanpur were huge boosts for my resume!",
    rating: 5,
    year: "Techkriti'25"
  },
  {
    id: 3,
    name: "Rohan Verma",
    role: "Regional Ambassador Lead",
    college: "BITS Pilani",
    quote: "Managing contingents for Asia's largest tech fest was an incredible experience. Winning cash rewards from the ₹2,00,000+ pool and getting VIP access to pronites made all the effort 100% worth it!",
    rating: 5,
    year: "Techkriti'25"
  },
  {
    id: 4,
    name: "Priya Nair",
    role: "Growth & Media Ambassador",
    college: "NIT Trichy",
    quote: "Techkriti CA program taught me digital marketing and campus outreach like no textbook could. The mentor team from IIT Kanpur was super supportive throughout the journey!",
    rating: 5,
    year: "Techkriti'26"
  },
  {
    id: 5,
    name: "Aditya Patel",
    role: "Campus Ambassador Lead",
    college: "IIT Bombay",
    quote: "Representing Techkriti at my university opened up direct internship recommendations and networking opportunities with top tech firms. Best student leadership program in India hands down!",
    rating: 5,
    year: "Techkriti'26"
  }
];

export const CaTestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying]);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section 
      style={{
        padding: '5rem 1.5rem 6rem',
        maxWidth: '72rem',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Ambient Royal Blue & Cyan Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '400px',
          opacity: 0.3,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(56, 189, 248, 0.2) 50%, transparent 80%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="reveal-3d-pop">
        <span 
          className="font-tech-sub"
          style={{ 
            display: 'inline-block', 
            padding: '0.4rem 1.25rem', 
            borderRadius: '9999px', 
            fontSize: '0.75rem', 
            fontWeight: 800, 
            color: '#38bdf8', 
            textTransform: 'uppercase', 
            letterSpacing: '0.2em',
            background: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            marginBottom: '1rem'
          }}
        >
          What Our Ambassadors Say
        </span>

        <h2 
          className="font-tech-heading"
          style={{ 
            fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', 
            fontWeight: 800, 
            color: '#ffffff', 
            margin: '0 0 1rem', 
            letterSpacing: '0.04em' 
          }}
        >
          HEAR FROM PAST <span style={{ color: '#38bdf8', textShadow: '0 0 20px rgba(56, 189, 248, 0.6)' }}>AMBASSADORS</span>
        </h2>

        <p 
          style={{ 
            color: 'hsl(40 6% 85%)', 
            fontSize: '1.05rem', 
            maxWidth: '38rem', 
            margin: '0 auto',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          Discover how leading Techkriti at their colleges transformed their leadership skills and opened doors to top career opportunities.
        </p>
      </div>

      {/* Main Testimonial Carousel Card Wrapper */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '54rem', margin: '0 auto' }} className="reveal-3d-pop">
        
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Testimonial"
          style={{
            position: 'absolute',
            left: '-1.25rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(8, 14, 28, 0.88)',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(12px)',
            transition: 'all 0.25s ease'
          }}
          className="hover:scale-110 hover:border-blue-400"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next Testimonial"
          style={{
            position: 'absolute',
            right: '-1.25rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(8, 14, 28, 0.88)',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(12px)',
            transition: 'all 0.25s ease'
          }}
          className="hover:scale-110 hover:border-blue-400"
        >
          <ChevronRight size={22} />
        </button>

        {/* 3D Pop Up Testimonial Card */}
        <div 
          className="liquid-glass"
          key={current.id}
          style={{
            borderRadius: '1.75rem',
            padding: '3rem 2.5rem 2.5rem',
            background: 'linear-gradient(145deg, rgba(8, 20, 42, 0.92), rgba(5, 10, 24, 0.98))',
            border: '1px solid rgba(59, 130, 246, 0.35)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Background Quote Decor */}
          <div 
            style={{
              position: 'absolute',
              top: '1.5rem',
              left: '2rem',
              opacity: 0.08,
              color: '#3b82f6',
              pointerEvents: 'none'
            }}
          >
            <Quote size={80} />
          </div>

          {/* User Avatar Circle */}
          <div 
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(56, 189, 248, 0.3))',
              border: '2px solid rgba(59, 130, 246, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              marginBottom: '1.75rem',
              boxShadow: '0 0 25px rgba(59, 130, 246, 0.45)',
              position: 'relative'
            }}
          >
            <User size={34} color="#38bdf8" />
            <div 
              style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #05030b'
              }}
            >
              <Award size={12} color="#ffffff" />
            </div>
          </div>

          {/* Star Rating */}
          <div style={{ display: 'flex', gap: '0.25rem', color: '#fbbf24', marginBottom: '1.25rem' }}>
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} size={16} fill="#fbbf24" stroke="none" />
            ))}
          </div>

          {/* Quote Text */}
          <p 
            style={{
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
              lineHeight: '1.75',
              color: 'hsl(40 6% 92%)',
              maxWidth: '44rem',
              margin: '0 0 2rem',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            "{current.quote}"
          </p>

          {/* Ambassador Name & College Info */}
          <div style={{ marginTop: 'auto' }}>
            <h3 
              className="font-tech-sub"
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#ffffff',
                margin: '0 0 0.25rem',
                letterSpacing: '0.04em'
              }}
            >
              {current.name}
            </h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#38bdf8', fontWeight: 600 }}>
              {current.role} • <span style={{ color: 'rgba(255, 255, 255, 0.75)' }}>{current.college}</span>
            </p>
            <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, marginTop: '0.35rem', display: 'inline-block' }}>
              {current.year}
            </span>
          </div>
        </div>

        {/* Interactive Pagination Dots at Bottom */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            marginTop: '2rem'
          }}
        >
          {TESTIMONIALS.map((t, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                style={{
                  width: isActive ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  background: isActive 
                    ? 'linear-gradient(90deg, #3b82f6, #38bdf8)' 
                    : 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 0 12px rgba(59, 130, 246, 0.6)' : 'none'
                }}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};
