import React, { useMemo } from 'react';

interface Sparkle {
  id: number;
  topPct: number;
  leftPct: number;
  size: number;
  delay: number;
  duration: number;
  type: 'star4' | 'star8';
  color: string;
}

export const GlassySparklesBackground: React.FC = () => {
  // Adaptive sparkle count: 120 on desktop, 32 on mobile for 60FPS performance
  const sparkles = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
    const totalSparkles = isMobile ? 36 : 120;
    const items: Sparkle[] = [];
    const colors = ['#38bdf8', '#60a5fa', '#93c5fd', '#ffffff', '#3b82f6', '#0ea5e9'];

    for (let i = 0; i < totalSparkles; i++) {
      items.push({
        id: i,
        topPct: (i / totalSparkles) * 95 + (Math.random() * 3 - 1.5),
        leftPct: Math.random() * 94 + 3,
        size: isMobile ? Math.floor(Math.random() * 10) + 6 : Math.floor(Math.random() * 16) + 8,
        delay: Math.random() * 7,
        duration: Math.random() * 4 + 3.5,
        type: i % 2 === 0 ? 'star4' : 'star8',
        color: colors[i % colors.length]
      });
    }
    return items;
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: '100vh', // Starts EXACTLY at bottom of Page 1 (Does not touch Hero!)
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes starTwinkle4 {
          0%, 100% {
            opacity: 0.15;
            transform: translate3d(0,0,0) scale(0.65) rotate(0deg);
          }
          50% {
            opacity: 0.95;
            transform: translate3d(0,0,0) scale(1.3) rotate(45deg);
            filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.9));
          }
        }

        @keyframes starTwinkle8 {
          0%, 100% {
            opacity: 0.2;
            transform: translate3d(0,0,0) scale(0.7) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: translate3d(0,0,0) scale(1.35) rotate(-30deg);
            filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.95));
          }
        }
      `}</style>

      {sparkles.map((sp) => {
        const animName = sp.type === 'star4' ? 'starTwinkle4' : 'starTwinkle8';

        return (
          <div
            key={sp.id}
            style={{
              position: 'absolute',
              top: `${sp.topPct}%`,
              left: `${sp.leftPct}%`,
              width: `${sp.size}px`,
              height: `${sp.size}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: sp.color,
              animation: `${animName} ${sp.duration}s ease-in-out infinite`,
              animationDelay: `${sp.delay}s`,
              willChange: 'transform, opacity'
            }}
          >
            {sp.type === 'star4' ? (
              /* 4-Point Glassy Sparkle Star */
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 5px rgba(56,189,248,0.7))' }}
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            ) : (
              /* 8-Point Diamond Star Sparkle */
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.85))' }}
              >
                <path d="M12 0L13.8 8.2L22 6L15.8 12.2L24 14L15.8 15.8L14 24L12.2 15.8L4 18L10.2 11.8L2 10L10.2 8.2L12 0Z" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
};
