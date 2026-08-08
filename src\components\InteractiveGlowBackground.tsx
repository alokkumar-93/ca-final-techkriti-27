import React, { useEffect, useRef } from 'react';

export const InteractiveGlowBackground: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -400, y: -400 });
  const currentPos = useRef({ x: -400, y: -400 });
  const activeColorRef = useRef<string>('rgba(56, 189, 248, 0.75)');
  const isVisibleRef = useRef<boolean>(false);

  // Intense Royal Blue & Cyan Mouse Follower Palette
  const sectionColors: Record<string, string> = {
    'home': 'rgba(56, 189, 248, 0.65)',
    'about': 'rgba(59, 130, 246, 0.75)',
    'techkriti-overview': 'rgba(56, 189, 248, 0.75)',
    'responsibilities': 'rgba(59, 130, 246, 0.8)',
    'incentives': 'rgba(56, 189, 248, 0.8)',
    'domains': 'rgba(59, 130, 246, 0.75)',
    'faq': 'rgba(56, 189, 248, 0.75)',
    'contact': 'rgba(59, 130, 246, 0.8)'
  };

  const updateColorForClientY = (clientY: number) => {
    const sections = document.querySelectorAll('[id]');
    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i] as HTMLElement;
      const id = sec.id;
      if (sectionColors[id]) {
        const rect = sec.getBoundingClientRect();
        if (clientY >= rect.top && clientY <= rect.bottom) {
          if (activeColorRef.current !== sectionColors[id]) {
            activeColorRef.current = sectionColors[id];
            if (glowRef.current) {
              glowRef.current.style.background = `radial-gradient(circle, ${sectionColors[id]} 0%, rgba(59, 130, 246, 0.35) 45%, rgba(5, 3, 11, 0) 75%)`;
            }
          }
          return;
        }
      }
    }
  };

  useEffect(() => {
    // Only initialize continuous mouse spotlight tracking on devices with mouse/pointer
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasMouse) return;

    let animId: number;

    const handlePointerMove = (clientX: number, clientY: number) => {
      targetPos.current = { x: clientX, y: clientY };
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        if (glowRef.current) glowRef.current.style.opacity = '0.9';
      }
      updateColorForClientY(clientY);
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onScroll = () => {
      updateColorForClientY(window.innerHeight / 2);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Native 60FPS / 120FPS GPU lerp loop
    const animate = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.18;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.18;
      
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentPos.current.x - 300}px, ${currentPos.current.y - 300}px, 0)`;
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden'
      }}
    >
      {/* 600px High-Intensity Blue & Cyan Interactive Mouse Follower Spotlight */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.75) 0%, rgba(59, 130, 246, 0.4) 45%, rgba(5, 3, 11, 0) 75%)',
          filter: 'blur(45px)',
          opacity: 0,
          transition: 'opacity 0.4s ease, background 0.4s ease',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden'
        }}
      />
    </div>
  );
};
