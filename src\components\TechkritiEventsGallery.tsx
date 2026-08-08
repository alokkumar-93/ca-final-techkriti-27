import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
// @ts-ignore
import CircularGallery from './CircularGallery';
import { X } from 'lucide-react';

export const TechkritiEventsGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const items = [
    { image: '/events/photo1.jpg', text: 'DEFENSE EXPO' },
    { image: '/events/photo2.jpg', text: 'ROBOWARS' },
    { image: '/events/photo3.jpg', text: 'CONCLAVE' },
    { image: '/events/photo4.jpg', text: 'DRONE RACING' },
    { image: '/events/photo5.jpg', text: 'PRONITES' },
    { image: '/events/photo6.jpg', text: 'LEADERSHIP' },
    { image: '/events/photo7.jpg', text: 'IITK NIGHTS' }
  ];

  // Prevent background scrolling and handle ESC key when lightbox is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };

    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedPhoto]);

  return (
    <section 
      id="gallery"
      style={{
        padding: '4rem 1rem',
        maxWidth: '85rem',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Background Cyan Ambient Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90vw',
          maxWidth: '1000px',
          height: '500px',
          opacity: 0.35,
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(59, 130, 246, 0.25) 50%, rgba(5, 3, 11, 0.95) 80%)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }} className="reveal-3d-pop">
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
          TECHKRITI
        </span>

        <h2 
          className="font-tech-heading"
          style={{ 
            fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', 
            fontWeight: 800, 
            color: '#ffffff', 
            margin: '0 0 0.85rem', 
            letterSpacing: '0.04em' 
          }}
        >
          FESTIVAL <span style={{ color: '#38bdf8', textShadow: '0 0 25px rgba(56, 189, 248, 0.6)' }}>GALLERY</span>
        </h2>

        <p 
          style={{ 
            color: 'hsl(40 6% 85%)', 
            fontSize: '1rem', 
            maxWidth: '40rem', 
            margin: '0 auto',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          Drag right or left to rotate. Tap any photo to open full view.
        </p>
      </div>

      {/* WebGL 3D Circular Gallery Container */}
      <div 
        style={{ 
          height: 'clamp(380px, 52vh, 580px)', 
          position: 'relative', 
          borderRadius: '1.5rem',
          overflow: 'hidden',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          background: 'linear-gradient(145deg, rgba(8, 20, 42, 0.6), rgba(5, 10, 24, 0.85))',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.25)'
        }}
        className="w-full touch-pan-y"
      >
        <CircularGallery
          items={items}
          bend={3}
          textColor="#38bdf8"
          borderRadius={0.05}
          scrollSpeed={3.2}
          scrollEase={0.06}
          font="bold 28px Orbitron"
          fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
          onItemClick={(imageSrc: string) => setSelectedPhoto(imageSrc)}
        />
      </div>

      {/* React DOM Portal Lightbox Modal to document.body */}
      {selectedPhoto && createPortal(
        <div 
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: '#020612',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {/* Prominent Glowing Top-Right Close Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhoto(null);
            }}
            style={{
              position: 'fixed',
              top: '1.25rem',
              right: '1.25rem',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#0f172a',
              border: '2px solid #38bdf8',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.8), 0 10px 30px rgba(0, 0, 0, 0.9)',
              transition: 'transform 0.2s ease',
              zIndex: 1000000
            }}
            aria-label="Close full photo view"
          >
            <X size={26} color="#38bdf8" />
          </button>

          {/* Full Photo Container */}
          <div 
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '82vh',
              borderRadius: '1rem',
              overflow: 'hidden',
              border: '1px solid rgba(56, 189, 248, 0.65)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 50px rgba(56, 189, 248, 0.4)',
              background: '#050a18',
              cursor: 'pointer'
            }}
          >
            <img 
              src={selectedPhoto} 
              alt="Full Techkriti Photo" 
              style={{
                maxWidth: '90vw',
                maxHeight: '80vh',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
