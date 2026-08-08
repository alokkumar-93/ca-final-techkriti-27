import React from 'react';

export const TechkritiLogo: React.FC<{ height?: number }> = ({ height = 32 }) => {
  return (
    <svg
      height={height}
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: `${height}px`, width: 'auto', display: 'block' }}
    >
      <g>
        {/* Main T shape with diagonal slices */}
        {/* Top bar left */}
        <polygon points="20,35 65,35 45,55 20,55" fill="#FFFFFF" />
        {/* Top bar right */}
        <polygon points="75,35 105,35 105,55 55,55" fill="#FFFFFF" />
        
        {/* Stem Top Section */}
        <polygon points="50,58 75,58 60,78 50,78" fill="#FFFFFF" />
        {/* Stem Middle Section */}
        <polygon points="50,83 75,83 60,103 50,103" fill="#FFFFFF" />
        {/* Stem Bottom Section */}
        <polygon points="50,108 75,108 70,128 50,128" fill="#FFFFFF" />

        {/* Sharp Diagonal Speed Slash Lines */}
        <line x1="10" y1="55" x2="60" y2="20" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="15" y1="62" x2="65" y2="27" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="15" y1="90" x2="95" y2="30" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="20" y1="97" x2="100" y2="37" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="30" y1="120" x2="110" y2="60" stroke="#FFFFFF" strokeWidth="2.5" />
        <line x1="35" y1="127" x2="115" y2="67" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="40" y1="145" x2="118" y2="88" stroke="#FFFFFF" strokeWidth="2.5" />
      </g>
    </svg>
  );
};
