import React from 'react';

const LOGOS = [
  { name: 'Vortex', initial: 'V' },
  { name: 'Nimbus', initial: 'N' },
  { name: 'Prysma', initial: 'P' },
  { name: 'Cirrus', initial: 'C' },
  { name: 'Kynder', initial: 'K' },
  { name: 'Halcyn', initial: 'H' },
];

export const LogoMarquee: React.FC = () => {
  // Duplicated 4 times for seamless infinite scroll
  const marqueeLogos = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <div 
      style={{
        width: '100%',
        maxWidth: '64rem',
        margin: '0 auto',
        paddingBottom: '2.5rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '3rem',
        position: 'relative',
        zIndex: 20,
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem'
      }}
    >
      {/* Left side static text */}
      <div 
        style={{
          color: 'rgba(242, 241, 240, 0.5)',
          fontSize: '0.875rem',
          lineHeight: '1.25',
          whiteSpace: 'nowrap'
        }}
      >
        Relied on by brands<br />across the globe
      </div>

      {/* Right side marquee */}
      <div 
        style={{
          flex: 1,
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        <div 
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '4rem',
            whiteSpace: 'nowrap',
            width: 'max-content',
            animation: 'marqueeLoop 20s linear infinite'
          }}
        >
          {marqueeLogos.map((logo, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div 
                className="liquid-glass"
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'hsl(40 6% 95%)',
                  flexShrink: 0
                }}
              >
                {logo.initial}
              </div>
              <span style={{ fontSize: '1rem', fontWeight: 600, color: 'hsl(40 6% 95%)', letterSpacing: '-0.01em' }}>
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeLoop {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
