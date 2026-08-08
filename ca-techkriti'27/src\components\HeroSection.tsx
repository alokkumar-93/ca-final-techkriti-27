import React from 'react';
import { BackgroundVideo } from './BackgroundVideo';
import { CaLogo } from './CaLogo';
import { ArrowRight, Trophy, Users, GraduationCap, Flame } from 'lucide-react';

interface HeroSectionProps {
  onCtaClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick }) => {
  return (
    <section 
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '5.5rem 1rem 4rem',
        backgroundColor: '#05030b',
        color: '#ffffff'
      }}
    >
      {/* 3D Ribbon Loop Video Background */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <BackgroundVideo />
      </div>

      {/* Hero Content Container */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '78rem',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 'auto 0'
        }}
      >

        {/* Centered CA Logo */}
        <div style={{ marginBottom: '1.25rem' }}>
          <CaLogo size={125} />
        </div>

        {/* Single Line Headline in Electric Blue & Cyan Theme */}
        <h1 
          className="font-tech-heading"
          style={{
            fontSize: 'clamp(1rem, 3.8vw, 3.5rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '0.01em',
            margin: '0 0 1.25rem',
            color: '#ffffff',
            whiteSpace: 'nowrap',
            maxWidth: '100%',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.8)'
          }}
        >
          TECHKRITI'27{' '}
          <span 
            style={{
              background: 'linear-gradient(135deg, #38bdf8 0%, #60a5fa 50%, #93c5fd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 35px rgba(56, 189, 248, 0.5))'
            }}
          >
            CAMPUS AMBASSADOR
          </span>
        </h1>

        {/* Subtitle Paragraph */}
        <p 
          style={{
            fontSize: 'clamp(0.9rem, 1.6vw, 1.15rem)',
            lineHeight: '1.7',
            color: 'rgba(255, 255, 255, 0.88)',
            maxWidth: '42rem',
            margin: '0 auto 2rem',
            fontFamily: 'Inter, sans-serif',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)',
            padding: '0 0.5rem'
          }}
        >
          Represent your college at Asia's largest technical & entrepreneurial festival. Lead campus contingents, gain real marketing experience, and win rewards backed by <span style={{ whiteSpace: 'nowrap' }}>IIT Kanpur.</span>
        </p>

        {/* Centered Join Now Button in Blue & Cyan Theme */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <button
            onClick={onCtaClick}
            className="font-tech-sub"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2.5rem',
              borderRadius: '9999px',
              fontSize: '1rem',
              fontWeight: 800,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
              border: '1px solid rgba(56, 189, 248, 0.6)',
              boxShadow: '0 0 30px rgba(56, 189, 248, 0.5), 0 10px 25px rgba(0, 0, 0, 0.6)',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 0 45px rgba(56, 189, 248, 0.7), 0 15px 30px rgba(0, 0, 0, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(56, 189, 248, 0.5), 0 10px 25px rgba(0, 0, 0, 0.6)';
            }}
          >
            JOIN NOW
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Key Stats Bar at Hero Bottom */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1.25rem',
            width: '100%',
            maxWidth: '52rem',
            background: 'rgba(8, 14, 28, 0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '1.25rem 1.5rem',
            borderRadius: '1.5rem',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.15)'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '1.35rem', fontWeight: 900 }} className="font-tech-heading">
              <Users size={18} />
              <span>2,500+</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '0.2rem' }} className="font-tech-sub">
              Ambassadors
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '1.35rem', fontWeight: 900 }} className="font-tech-heading">
              <GraduationCap size={18} />
              <span>150+</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '0.2rem' }} className="font-tech-sub">
              Colleges
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '1.35rem', fontWeight: 900 }} className="font-tech-heading">
              <Trophy size={18} />
              <span>₹2,00,000+</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '0.2rem' }} className="font-tech-sub">
              Prize Pool
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '1.35rem', fontWeight: 900 }} className="font-tech-heading">
              <Flame size={18} />
              <span>50,000+</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '0.2rem' }} className="font-tech-sub">
              Fest Footfall
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
