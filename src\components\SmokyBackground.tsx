import React from 'react';

export const SmokyBackground: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      {/* Smoky Black Cloud 1 - Top Left Floating Mist */}
      <div
        className="smoky-cloud-1"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(15, 10, 25, 0.14) 0%, rgba(30, 20, 45, 0.05) 55%, transparent 80%)',
          filter: 'blur(95px)'
        }}
      />

      {/* Smoky Black Cloud 2 - Center Right Floating Fog */}
      <div
        className="smoky-cloud-2"
        style={{
          position: 'absolute',
          top: '35%',
          right: '-10%',
          width: '850px',
          height: '850px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(10, 5, 20, 0.16) 0%, rgba(25, 15, 40, 0.04) 60%, transparent 80%)',
          filter: 'blur(110px)'
        }}
      />

      {/* Smoky Black Cloud 3 - Bottom Left Deep Smoke */}
      <div
        className="smoky-cloud-3"
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '15%',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(18, 12, 30, 0.13) 0%, rgba(20, 10, 35, 0.03) 65%, transparent 80%)',
          filter: 'blur(100px)'
        }}
      />
    </div>
  );
};
