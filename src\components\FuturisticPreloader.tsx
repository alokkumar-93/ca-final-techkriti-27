import React, { useEffect, useState } from 'react';
import { TechkritiLogo } from './TechkritiLogo';
import { ShieldCheck, Cpu } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export const FuturisticPreloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Smooth 0% -> 100% progress counter over ~1.5s
    const startTime = Date.now();
    const duration = 1500;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(onComplete, 600);
        }, 150);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#05030b',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFadingOut ? 0 : 1,
        transform: isFadingOut ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isFadingOut ? 'none' : 'auto',
        overflow: 'hidden'
      }}
    >
      {/* Background Cyber Grid Matrix Lines */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.7,
          pointerEvents: 'none'
        }}
      />

      {/* Deep Electric Royal Blue Ambient Glow Core */}
      <div 
        style={{
          position: 'absolute',
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.38) 0%, rgba(56, 189, 248, 0.15) 45%, transparent 75%)',
          filter: 'blur(90px)',
          animation: 'bluePulse 3.5s ease-in-out infinite',
          willChange: 'transform'
        }}
      />

      <style>{`
        @keyframes bluePulse {
          0%, 100% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
      `}</style>

      {/* Main High-Tech Futuristic Preloader Card */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          maxWidth: '28rem',
          width: '90%',
          textAlign: 'center'
        }}
      >
        {/* Techkriti Logo with Cyan Halo */}
        <div style={{ position: 'relative', filter: 'drop-shadow(0 0 20px rgba(56, 189, 248, 0.6))' }}>
          <TechkritiLogo height={46} />
        </div>

        {/* TECHKRITI'27 Header */}
        <div 
          className="font-tech-heading"
          style={{ 
            fontSize: '2rem', 
            fontWeight: 800, 
            letterSpacing: '0.2em', 
            color: '#ffffff', 
            textTransform: 'uppercase',
            textShadow: '0 0 25px rgba(56, 189, 248, 0.7)'
          }}
        >
          TECHKRITI'27
        </div>

        <div className="font-tech-sub" style={{ fontSize: '0.75rem', color: 'rgba(56, 189, 248, 0.85)', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: '-0.75rem', fontWeight: 700 }}>
          IIT KANPUR • CA PORTAL
        </div>

        {/* FUTURISTIC PROGRESS LOADING BAR */}
        <div 
          style={{ 
            width: '100%', 
            marginTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem'
          }}
        >
          {/* Status Label & Percentage Counter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.85)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Cpu size={14} color="#38bdf8" />
              <span>{progress < 40 ? 'INITIALIZING ENGINE...' : progress < 80 ? 'LOADING CA ASSETS...' : 'SYSTEM READY'}</span>
            </span>
            <span className="font-tech-sub" style={{ color: '#38bdf8', fontSize: '0.9rem', fontWeight: 800 }}>
              {progress}%
            </span>
          </div>

          {/* Futuristic Outer Glass Capsule */}
          <div 
            style={{
              position: 'relative',
              width: '100%',
              height: '14px',
              backgroundColor: 'rgba(8, 14, 28, 0.9)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '9999px',
              padding: '2px',
              overflow: 'hidden',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.35), inset 0 0 10px rgba(0, 0, 0, 0.8)'
            }}
          >
            {/* Dynamic Electric Blue & Cyan Progress Bar Fill */}
            <div 
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #2563eb, #3b82f6, #38bdf8)',
                borderRadius: '9999px',
                transition: 'width 0.06s linear',
                position: 'relative',
                boxShadow: '0 0 16px #38bdf8, 0 0 25px #3b82f6'
              }}
            >
              {/* Glowing Leading Laser Head */}
              <div 
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: '6px',
                  backgroundColor: '#ffffff',
                  borderRadius: '50%',
                  boxShadow: '0 0 12px #ffffff, 0 0 20px #38bdf8'
                }}
              />
            </div>
          </div>

          {/* Footer Security Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '0.5rem', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.675rem', fontWeight: 600 }}>
            <ShieldCheck size={13} color="#38bdf8" />
            <span>SECURE ENCRYPTED AMBASSADOR PORTAL</span>
          </div>
        </div>

      </div>
    </div>
  );
};
