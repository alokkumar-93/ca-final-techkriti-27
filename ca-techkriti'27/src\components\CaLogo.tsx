import React from 'react';

export const CaLogo: React.FC<{ size?: number }> = ({ size = 160 }) => {
  return (
    <div 
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Blended Conic Shine Rays with Radial Gradient Mask (Royal Blue & Cyan Theme) */}
      <div 
        style={{
          position: 'absolute',
          inset: '-70%',
          background: `
            conic-gradient(
              from 0deg,
              transparent 0deg, rgba(56, 189, 248, 0.22) 12deg, transparent 24deg,
              transparent 45deg, rgba(59, 130, 246, 0.2) 57deg, transparent 69deg,
              transparent 90deg, rgba(96, 165, 250, 0.18) 102deg, transparent 114deg,
              transparent 135deg, rgba(56, 189, 248, 0.22) 147deg, transparent 159deg,
              transparent 180deg, rgba(59, 130, 246, 0.2) 192deg, transparent 204deg,
              transparent 225deg, rgba(96, 165, 250, 0.18) 237deg, transparent 249deg,
              transparent 270deg, rgba(56, 189, 248, 0.22) 282deg, transparent 294deg,
              transparent 315deg, rgba(59, 130, 246, 0.2) 327deg, transparent 339deg,
              transparent 360deg
            )
          `,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'blur(8px)',
          WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 15%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0) 70%)',
          maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 15%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0) 70%)',
          animation: 'spinSlow 28s linear infinite'
        }}
      />

      {/* Deep Ambient Neon Core Glow */}
      <div 
        style={{
          position: 'absolute',
          inset: '-20px',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.5) 0%, rgba(59, 130, 246, 0.3) 45%, transparent 75%)',
          filter: 'blur(35px)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <svg
        width={size}
        height={size * 0.75}
        viewBox="0 0 200 150"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'relative',
          zIndex: 1,
          filter: 'drop-shadow(0 0 18px rgba(56, 189, 248, 0.5))'
        }}
      >
        {/* Unified stroke-based geometric styling for C and A */}
        <g stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* 'C' shape wrapping from top-right to bottom-right */}
          <path d="M 105,38 A 45,45 0 1,0 105,112" />

          {/* 'A' Right Leg */}
          <line x1="135" y1="32" x2="173" y2="118" />

          {/* 'A' Left Leg terminating at crossbar */}
          <line x1="135" y1="32" x2="114" y2="80" />

          {/* 'A' Crossbar */}
          <line x1="102" y1="80" x2="152" y2="80" />
        </g>

        {/* Electric Cyan & Royal Blue trapezoid foot accent at bottom-right leg of A */}
        <polygon 
          points="152,118 186,118 174,136 140,136" 
          fill="#38BDF8" 
        />
      </svg>

      <style>{`
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
