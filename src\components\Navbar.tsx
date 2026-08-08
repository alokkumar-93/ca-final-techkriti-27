import React from 'react';
import { TechkritiLogo } from './TechkritiLogo';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSignUpClick?: () => void;
}

const NAV_TABS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'incentives', label: 'Incentives' },
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'contact', label: 'Contact Us' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, onSignUpClick }) => {
  return (
    <header style={{ width: '100%', position: 'relative', zIndex: 20 }}>
      <nav 
        style={{
          width: '100%',
          padding: '1.25rem 2rem',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Left: Logo + TECHKRITI'27 */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
          onClick={() => onTabChange('home')}
        >
          <TechkritiLogo height={34} />
          <span 
            style={{
              fontFamily: '"Jost", "Futura PT", "Futura", "Montserrat", sans-serif',
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '0.15em',
              color: '#ffffff',
              textTransform: 'uppercase',
              lineHeight: 1
            }}
          >
            TECHKRITI'27
          </span>
        </div>

        {/* Center: Tab Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {NAV_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                style={{
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.3))' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isActive 
                    ? '1px solid rgba(236, 72, 153, 0.65)' 
                    : '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '9999px',
                  padding: '0.5rem 1.15rem',
                  color: isActive ? '#ffffff' : 'rgba(242, 241, 240, 0.8)',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: isActive 
                    ? '0 0 20px rgba(236, 72, 153, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.3)' 
                    : 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                  textShadow: isActive ? '0 0 8px rgba(236, 72, 153, 0.6)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right: Sign Up / Register Button */}
        <div>
          <button
            onClick={onSignUpClick}
            style={{
              background: 'linear-gradient(135deg, #ec4899, #a855f7)',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.55rem 1.35rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              color: '#ffffff',
              boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            Register Now
          </button>
        </div>
      </nav>

      {/* 1px divider line with gradient below navbar */}
      <div 
        style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(242, 241, 240, 0.15), transparent)',
          marginTop: '3px'
        }}
      />
    </header>
  );
};
