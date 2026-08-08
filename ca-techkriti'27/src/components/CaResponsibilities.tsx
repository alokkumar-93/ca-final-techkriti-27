import React, { useState } from 'react';
import { Megaphone, Users, Award, Rocket, Share2, Sparkles, RotateCw } from 'lucide-react';

export const CaResponsibilities: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCardFlip = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const responsibilities = [
    {
      icon: Megaphone,
      title: "Publicize & Promote",
      desc: "Drive awareness for Techkriti / Techfest IIT Kanpur events across your college campus and social channels.",
      backTitle: "Brand Amplification",
      backDesc: "Share official posters, reels, and announcements. Boost Techkriti'27 registrations across all your campus channels.",
      stat: "Social Outreach",
      accent: "#38bdf8"
    },
    {
      icon: Users,
      title: "Campus Liaison",
      desc: "Act as the primary point of contact between IIT Kanpur organizers and your college administration & students.",
      backTitle: "Official Representative",
      backDesc: "Coordinate with college authorities for event permissions and connect directly with IIT Kanpur core managers.",
      stat: "Admin Contact",
      accent: "#38bdf8"
    },
    {
      icon: Rocket,
      title: "Event Facilitation",
      desc: "Help organize pre-festival workshops, roadshows, and preliminary competitions at your institution.",
      backTitle: "Pre-Fest Workshops",
      backDesc: "Host campus hackathons, technical webinars, and workshop sessions backed with official IITK resources.",
      stat: "Workshops & Tech",
      accent: "#38bdf8"
    },
    {
      icon: Share2,
      title: "Social Campaigns",
      desc: "Amplify Techkriti digital campaigns, tech talks, and flagship announcements on social media platforms.",
      backTitle: "Digital Engagement",
      backDesc: "Lead social media buzz, viral posts, and online campus community groups to build active participation.",
      stat: "Digital Marketing",
      accent: "#38bdf8"
    },
    {
      icon: Sparkles,
      title: "Contingent Leader",
      desc: "Form and mentor your college delegation, guiding student participants to maximum competition entries.",
      backTitle: "Team Captain",
      backDesc: "Build and lead a strong contingent of participants, ensuring smooth travel and accommodation at IIT Kanpur.",
      stat: "Delegation Lead",
      accent: "#38bdf8"
    },
    {
      icon: Award,
      title: "Executive Feedback",
      desc: "Provide on-ground insights and student feedback to help tailor Techkriti programs for your college network.",
      backTitle: "Strategic Partner",
      backDesc: "Participate in executive feedback sessions with IITK organizers to refine event experiences and rewards.",
      stat: "Strategy & Insights",
      accent: "#38bdf8"
    }
  ];

  return (
    <section 
      style={{
        padding: '5.5rem 1.5rem',
        maxWidth: '85rem',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Background Ambient Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '500px',
          opacity: 0.35,
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(59, 130, 246, 0.25) 50%, rgba(5, 3, 11, 0.95) 80%)',
          filter: 'blur(110px)',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="reveal-3d-pop">
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
          CORE RESPONSIBILITIES
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
          WHAT WILL YOU <span style={{ color: '#38bdf8', textShadow: '0 0 25px rgba(56, 189, 248, 0.6)' }}>DO?</span>
        </h2>

        <p 
          style={{ 
            color: 'hsl(40 6% 85%)', 
            fontSize: '1.1rem', 
            maxWidth: '44rem', 
            margin: '0 auto',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          As a Techkriti'27 Campus Ambassador, you are the face of IIT Kanpur's flagship festival at your college.
        </p>
      </div>

      {/* 6 Responsive Grid Cards */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}
      >
        {responsibilities.map((item, idx) => {
          const IconComp = item.icon;
          const isFlipped = !!flippedCards[idx];

          return (
            <div 
              key={idx} 
              className={`flip-card ${idx % 2 === 0 ? 'reveal-3d-left' : 'reveal-3d-right'}`}
              onClick={() => toggleCardFlip(idx)}
            >
              <div 
                className={`flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}
                style={{
                  minHeight: '355px'
                }}
              >
                {/* FRONT FACE */}
                <div 
                  className="flip-card-front"
                  style={{
                    background: 'linear-gradient(145deg, rgba(8, 20, 42, 0.95), rgba(5, 10, 24, 0.98))',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.5rem',
                    borderRadius: '1.25rem',
                    overflow: 'hidden'
                  }}
                >
                  <div>
                    {/* Top Icon Box */}
                    <div 
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '0.85rem',
                        background: 'rgba(56, 189, 248, 0.14)',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#38bdf8',
                        boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)',
                        marginBottom: '1.25rem'
                      }}
                    >
                      <IconComp size={26} />
                    </div>

                    <h3 
                      className="font-tech-heading"
                      style={{ 
                        fontSize: '1.35rem', 
                        fontWeight: 800, 
                        color: '#ffffff', 
                        margin: '0 0 0.75rem',
                        letterSpacing: '0.02em'
                      }}
                    >
                      {item.title}
                    </h3>

                    <p 
                      style={{ 
                        color: 'hsl(40 6% 85%)', 
                        fontSize: '0.95rem', 
                        lineHeight: '1.6',
                        margin: 0,
                        fontFamily: 'Inter, sans-serif'
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* Clean Bottom Tap to Flip Pill */}
                  <div 
                    style={{ 
                      marginTop: '1.25rem',
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.4rem', 
                      fontSize: '0.75rem', 
                      fontWeight: 800, 
                      color: '#38bdf8',
                      letterSpacing: '0.1em'
                    }}
                    className="font-tech-sub"
                  >
                    <span>Tap to Flip</span>
                    <RotateCw size={12} />
                  </div>
                </div>

                {/* BACK FACE */}
                <div 
                  className="flip-card-back"
                  style={{
                    background: 'linear-gradient(145deg, rgba(5, 25, 55, 0.98), rgba(2, 10, 28, 0.98))',
                    border: '1.5px solid #38bdf8',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(56, 189, 248, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.5rem',
                    borderRadius: '1.25rem',
                    overflow: 'hidden'
                  }}
                >
                  <div>
                    <span 
                      className="font-tech-sub"
                      style={{ 
                        fontSize: '0.7rem', 
                        fontWeight: 800, 
                        color: '#38bdf8', 
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        display: 'block',
                        marginBottom: '0.65rem'
                      }}
                    >
                      ACTION BLUEPRINT
                    </span>

                    <h3 
                      className="font-tech-heading"
                      style={{ 
                        fontSize: '1.35rem', 
                        fontWeight: 800, 
                        color: '#ffffff', 
                        margin: '0 0 0.85rem',
                        letterSpacing: '0.02em'
                      }}
                    >
                      {item.backTitle}
                    </h3>

                    <p 
                      style={{ 
                        color: 'hsl(40 6% 90%)', 
                        fontSize: '0.95rem', 
                        lineHeight: '1.65',
                        margin: 0,
                        fontFamily: 'Inter, sans-serif'
                      }}
                    >
                      {item.backDesc}
                    </p>
                  </div>

                  {/* Clean Bottom Tap to Return Pill */}
                  <div 
                    style={{ 
                      marginTop: '1.25rem',
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.4rem', 
                      fontSize: '0.75rem', 
                      fontWeight: 800, 
                      color: '#38bdf8',
                      letterSpacing: '0.1em'
                    }}
                    className="font-tech-sub"
                  >
                    <span>Tap to Return</span>
                    <RotateCw size={12} />
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
