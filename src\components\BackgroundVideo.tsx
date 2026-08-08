import React, { useRef, useEffect } from 'react';

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4";

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {});

    // Pause video when scrolled out of view to free up mobile GPU resources!
    if (typeof IntersectionObserver !== 'undefined' && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0.75) 88%, rgba(0,0,0,0) 100%)',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0.75) 88%, rgba(0,0,0,0) 100%)'
      }}
    >
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.95,
          filter: 'grayscale(100%) sepia(100%) hue-rotate(185deg) saturate(450%) brightness(1.05) contrast(1.15)',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform'
        }}
      />
      
      {/* Deep Royal Blue Overlay Gradient */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 45%, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.12) 55%, transparent 80%)',
          pointerEvents: 'none'
        }}
      />

      {/* Soft Bottom Gradient Fade */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(5, 3, 11, 0.05) 55%, rgba(5, 3, 11, 0.5) 82%, rgba(5, 3, 11, 0.92) 95%, #05030b 100%)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};
