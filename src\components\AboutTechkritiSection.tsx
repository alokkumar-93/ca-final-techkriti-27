import React from 'react';
import { Trophy, Cpu, Mic, Music, Rocket, Palette, Heart, Flame } from 'lucide-react';

export const AboutTechkritiSection: React.FC = () => {
  const highlights = [
    {
      icon: Trophy,
      title: "COMPETITIONS",
      desc: "Participate in cutting-edge technical and entrepreneurial challenges across various domains including coding, robotics, and business case studies."
    },
    {
      icon: Cpu,
      title: "WORKSHOPS",
      desc: "Learn from industry experts in hands-on technical sessions covering emerging technologies like AI, blockchain, and IoT."
    },
    {
      icon: Mic,
      title: "TALKS",
      desc: "Get inspired by thought leaders, innovators, and industry pioneers sharing their insights and experiences."
    },
    {
      icon: Music,
      title: "SHOWS",
      desc: "Enjoy spectacular performances, pro-nites, and cultural events featuring renowned artists and performers."
    },
    {
      icon: Rocket,
      title: "STARTUP EXPO",
      desc: "Showcase innovative ideas, connect with investors, and explore entrepreneurship opportunities at our startup exhibition."
    },
    {
      icon: Palette,
      title: "EXHIBITIONS",
      desc: "Experience cutting-edge technological demonstrations, innovative projects, and interactive displays from leading companies and institutions."
    },
    {
      icon: Heart,
      title: "SOCIAL INITIATIVES",
      desc: "Participate in initiatives that use technology for social good, addressing real-world challenges and making a positive impact on society."
    },
    {
      icon: Flame,
      title: "PRONITES",
      desc: "Experience electrifying live performances, music, and unforgettable nights at Techkriti!"
    }
  ];

  return (
    <section 
      style={{
        padding: '6rem 1.5rem 5rem',
        maxWidth: '74rem',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Royal Blue Ambient Glow Background */}
      <div 
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '850px',
          height: '450px',
          opacity: 0.35,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(5, 3, 11, 0.95) 75%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="reveal-3d-pop">
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
            marginBottom: '1rem'
          }}
        >
          Asia's Premier Tech & Entrepreneurship Festival
        </span>

        <h2 
          className="font-tech-heading"
          style={{ 
            fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', 
            fontWeight: 800, 
            color: '#ffffff', 
            margin: '0 0 1.25rem', 
            letterSpacing: '0.04em' 
          }}
        >
          ABOUT <span style={{ color: '#38bdf8', textShadow: '0 0 20px rgba(56, 189, 248, 0.6)' }}>TECHKRITI</span>
        </h2>

        {/* Full Overview Paragraph */}
        <p 
          style={{ 
            color: 'rgba(255, 255, 255, 0.85)', 
            fontSize: '1.05rem', 
            lineHeight: '1.8', 
            maxWidth: '56rem', 
            margin: '0 auto',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          Techkriti is the annual inter-collegiate technical and entrepreneurship festival organized by IIT Kanpur. Founded in 1995, it aims to spark interest and encourage innovation in technology among students across India. Now in its 32nd edition, Techkriti has become one of Asia's largest technical festivals, igniting passion in young minds and providing a platform to showcase their skills. Innovation and perseverance are at the heart of the event, with social welfare also playing a key role. Every year, we select ambassadors from colleges across the country to promote Techkriti, helping them develop their organizational and management skills.
        </p>
      </div>

      {/* Royal Blue & White 8-Card Grid with 3D Entrance */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '1.5rem' 
        }}
      >
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          const revealClass = idx % 2 === 0 ? 'reveal-3d-left' : 'reveal-3d-right';

          return (
            <div
              key={idx}
              className={revealClass}
              style={{
                transitionDelay: `${(idx % 4) * 0.1}s`,
                borderRadius: '1.25rem',
                padding: '2rem 1.5rem',
                background: 'linear-gradient(145deg, rgba(8, 20, 42, 0.85), rgba(5, 10, 24, 0.95))',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease-out',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-8px) scale(1.02)';
                el.style.borderColor = '#38bdf8';
                el.style.boxShadow = '0 20px 45px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0) scale(1)';
                el.style.borderColor = 'rgba(59, 130, 246, 0.25)';
                el.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
              }}
            >
              {/* Royal Blue Icon Pill */}
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '16px', 
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#ffffff',
                  marginBottom: '1.25rem',
                  boxShadow: '0 0 25px rgba(59, 130, 246, 0.6)'
                }}
              >
                <Icon size={26} />
              </div>

              {/* Title */}
              <h3 
                className="font-tech-sub"
                style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: 800, 
                  color: '#ffffff', 
                  letterSpacing: '0.08em', 
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase'
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p 
                style={{ 
                  color: 'rgba(242, 241, 240, 0.75)', 
                  fontSize: '0.85rem', 
                  lineHeight: '1.65',
                  margin: 0
                }}
              >
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
