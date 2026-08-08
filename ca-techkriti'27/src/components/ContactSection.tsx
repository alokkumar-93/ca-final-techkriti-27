import React from 'react';
import { Mail, Phone, MapPin, ArrowRight, ChevronRight, Globe, LogIn } from 'lucide-react';
import { TechkritiLogo } from './TechkritiLogo';

interface ContactSectionProps {
  onTabChange?: (tabId: string) => void;
  onSignUpClick?: () => void;
  onLoginClick?: () => void;
}

const InstagramIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export const ContactSection: React.FC<ContactSectionProps> = ({ onTabChange, onSignUpClick, onLoginClick }) => {
  return (
    <footer 
      style={{
        padding: '6rem 1.5rem 3rem',
        maxWidth: '74rem',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Background Ambient Royal Blue & Cyan Aura */}
      <div 
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '850px',
          height: '400px',
          opacity: 0.25,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 80%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      {/* Main Call-to-Action Card */}
      <div 
        className="liquid-glass reveal-3d-pop"
        style={{
          borderRadius: '2rem',
          padding: '3.5rem 2.5rem',
          background: 'linear-gradient(145deg, rgba(8, 20, 42, 0.92), rgba(5, 10, 24, 0.98))',
          border: '1px solid rgba(59, 130, 246, 0.35)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          textAlign: 'center',
          marginBottom: '5rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
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
            background: 'rgba(59, 130, 246, 0.12)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            marginBottom: '1.25rem'
          }}
        >
          Techkriti'27 IIT Kanpur
        </span>

        <h2 
          className="font-tech-heading"
          style={{ 
            fontSize: 'clamp(2.25rem, 5vw, 4.25rem)', 
            fontWeight: 800, 
            color: '#ffffff', 
            margin: '0 0 1rem', 
            letterSpacing: '0.04em' 
          }}
        >
          READY TO LEAD YOUR <span style={{ color: '#38bdf8', textShadow: '0 0 20px rgba(56, 189, 248, 0.6)' }}>CAMPUS?</span>
        </h2>

        <p 
          style={{ 
            color: 'hsl(40 6% 85%)', 
            fontSize: '1.1rem', 
            maxWidth: '40rem', 
            margin: '0 auto 2.25rem',
            lineHeight: '1.7',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          Join 2,500+ student leaders across India. Boost your resume with an official Certificate from IIT Kanpur and win cash rewards from the ₹2,00,000+ pool.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={onSignUpClick}
            className="font-tech-sub"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '1rem 2.25rem',
              borderRadius: '9999px',
              fontSize: '0.95rem',
              fontWeight: 800,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
              border: '1px solid rgba(56, 189, 248, 0.6)',
              boxShadow: '0 0 30px rgba(56, 189, 248, 0.5)',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              transition: 'transform 0.3s ease, boxShadow 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            BECOME AN AMBASSADOR NOW
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* 4 Column Footer Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          paddingBottom: '4rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Col 1: Brand Logo & Mission */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <TechkritiLogo height={42} />
            <div>
              <div className="font-tech-heading" style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.05em' }}>
                TECHKRITI<span style={{ color: '#38bdf8' }}>'27</span>
              </div>
              <div className="font-tech-sub" style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '0.15em' }}>
                IIT KANPUR
              </div>
            </div>
          </div>
          <p style={{ color: 'rgba(242, 241, 240, 0.7)', fontSize: '0.875rem', lineHeight: '1.65', margin: 0 }}>
            Asia's largest annual technical and entrepreneurial festival, inspiring over 50,000+ visionaries and leaders every year.
          </p>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h4 className="font-tech-sub" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.15em', marginBottom: '1.25rem' }}>
            QUICK LINKS
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About CA Program' },
              { id: 'techkriti-overview', label: 'Techkriti Overview' },
              { id: 'responsibilities', label: 'CA Responsibilities' },
              { id: 'incentives', label: 'Perks & Rewards' },
              { id: 'reach', label: 'Our Reach' },
              { id: 'faq', label: 'Frequently Asked Questions' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => onTabChange?.(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(242, 241, 240, 0.75)',
                  fontSize: '0.875rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
                className="hover:text-blue-400"
              >
                <ChevronRight size={14} />
                <span>{link.label}</span>
              </button>
            ))}
            {/* Login Quick Link */}
            <button
              onClick={() => onLoginClick?.()}
              style={{
                background: 'none',
                border: 'none',
                color: '#38bdf8',
                fontSize: '0.875rem',
                textAlign: 'left',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontWeight: 600
              }}
              className="hover:text-blue-300"
            >
              <LogIn size={14} />
              <span>Login</span>
            </button>
          </div>
        </div>

        {/* Col 3: Contact Info */}
        <div>
          <h4 className="font-tech-sub" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.15em', marginBottom: '1.25rem' }}>
            CONTACT US
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', color: 'rgba(242, 241, 240, 0.8)', fontSize: '0.875rem' }}>
              <MapPin size={18} color="#38bdf8" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
              <span>Techkriti Office, SUB 206, IIT Kanpur, Uttar Pradesh — 208016</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'rgba(242, 241, 240, 0.8)', fontSize: '0.875rem' }}>
              <Mail size={18} color="#38bdf8" style={{ flexShrink: 0 }} />
              <a href="mailto:ca@techkriti.org" style={{ color: '#38bdf8', textDecoration: 'none' }} className="hover:underline">
                ca@techkriti.org
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'rgba(242, 241, 240, 0.8)', fontSize: '0.875rem' }}>
              <Phone size={18} color="#38bdf8" style={{ flexShrink: 0 }} />
              <span>+91 512 259 7787</span>
            </div>
          </div>
        </div>

        {/* Col 4: Official Social Handles */}
        <div>
          <h4 className="font-tech-sub" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.15em', marginBottom: '1.25rem' }}>
            CONNECT WITH US
          </h4>
          <p style={{ color: 'rgba(242, 241, 240, 0.7)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Follow Techkriti'27 for official updates and announcements.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[
              { icon: Globe, href: 'https://techkriti.org', label: 'Official Website' },
              { icon: InstagramIcon, href: 'https://instagram.com/techkriti.iitk', label: 'Instagram' },
              { icon: LinkedinIcon, href: 'https://linkedin.com/company/techkriti-iitk', label: 'LinkedIn' },
            ].map((social, sIdx) => {
              const SIcon = social.icon;
              return (
                <a
                  key={sIdx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    transition: 'all 0.25s ease'
                  }}
                  className="hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-300"
                >
                  <SIcon size={18} />
                </a>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom Copyright Row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', paddingTop: '2rem', gap: '1rem' }}>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(242, 241, 240, 0.5)' }}>
          © Techkriti'27 IIT Kanpur. All rights reserved. Organized by Students' Gymkhana, IIT Kanpur.
        </p>
        <span className="font-tech-sub" style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, letterSpacing: '0.08em' }}>
          ASIA'S PREMIER TECH & ENTREPRENEURSHIP FESTIVAL
        </span>
      </div>

    </footer>
  );
};
