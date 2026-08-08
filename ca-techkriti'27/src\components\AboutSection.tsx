import React, { useState } from 'react';
import { Target, Users, BookOpen, Lightbulb, Megaphone, Crown, RotateCw } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCardFlip = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const pillars = [
    {
      icon: Target,
      title: 'Strategic Outreach & Publicity',
      desc: 'Lead official Techkriti\'27 marketing campaigns in your institution. Distribute publicity materials, digital banners, and manage social media announcements.',
      backTitle: 'Outreach Execution',
      backDesc: 'Distribute campus posters & digital banners. Drive student event registrations and manage social campaign outreach.',
      accent: '#38bdf8'
    },
    {
      icon: Users,
      title: 'Campus Leadership & Contingents',
      desc: 'Form and command your college contingent. Recruit sub-ambassadors, coordinate delegation travel, and lead your team to the IIT Kanpur campus.',
      backTitle: 'Contingent Leader',
      backDesc: 'Recruit college sub-ambassadors, lead campus delegation to IITK, and coordinate directly with festival managers.',
      accent: '#38bdf8'
    },
    {
      icon: BookOpen,
      title: 'Skill & Professional Growth',
      desc: 'Develop real-world expertise in digital marketing, team management, public relations, and event hosting under direct guidance from IIT Kanpur alumni.',
      backTitle: 'Alumni Masterclasses',
      backDesc: 'Access exclusive masterclasses on brand strategy, real-world campaign execution, and direct mentorship from IITK team.',
      accent: '#38bdf8'
    },
    {
      icon: Lightbulb,
      title: 'IIT Kanpur Accreditation',
      desc: 'Earn an official Certificate of Appreciation from IIT Kanpur, performance bonuses, stipend rewards, and VIP passes to all festival pronites.',
      backTitle: 'IITK Verification',
      backDesc: 'Receive a nationally recognized certificate signed by faculty, cash rewards & stipends, and an all-access VIP pronite pass.',
      accent: '#38bdf8'
    },
    {
      icon: Megaphone,
      title: 'Pre-Festival Campus Events',
      desc: 'Organize official Techkriti pre-festival workshops, coding hackathons, and info sessions in your college with full kit support from IIT Kanpur.',
      backTitle: 'Workshop Hosting',
      backDesc: 'Host official tech workshops, coding bootcamps, and info sessions at your campus with direct sponsorship & certs.',
      accent: '#38bdf8'
    },
    {
      icon: Crown,
      title: 'VIP Leaderboard & Executive Rank',
      desc: 'Compete on the live national CA leaderboard to earn exclusive executive badges, spotlight features, and direct mentorship from IITK team leaders.',
      backTitle: 'National Executive Rank',
      backDesc: 'Climb national leaderboard for featured profile badges, special commendation letters, and exclusive executive networking.',
      accent: '#38bdf8'
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
      {/* Subtle Background Cyan Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
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
          CORE AMBASSADOR PILLARS
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
          WHY BECOME A <span style={{ color: '#38bdf8', textShadow: '0 0 25px rgba(56, 189, 248, 0.6)' }}>CAMPUS AMBASSADOR?</span>
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
          Discover how leading Techkriti at your college transforms your leadership skills and opens doors to top career opportunities.
        </p>
      </div>

      {/* 6 Grid Cards */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}
      >
        {pillars.map((pillar, idx) => {
          const IconComponent = pillar.icon;
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
                      <IconComponent size={26} />
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
                      {pillar.title}
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
                      {pillar.desc}
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
                      EXECUTIVE DETAILS
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
                      {pillar.backTitle}
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
                      {pillar.backDesc}
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
