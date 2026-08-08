import React, { useState } from 'react';
import { Award, Trophy, Ticket, Gift, Briefcase, TrendingUp, RotateCw } from 'lucide-react';

export const CaIncentives: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCardFlip = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const perks = [
    {
      icon: Award,
      title: "Official Certificate",
      detail: "Certificate of Appreciation from IIT Kanpur recognized nationwide.",
      backTitle: "IITK Accreditation",
      backDesc: "Verified certificate signed by festival chairpersons and IIT Kanpur faculty, enhancing your resume.",
      accent: "#38bdf8"
    },
    {
      icon: Trophy,
      title: "Grand Cash Prizes",
      detail: "Pool of ₹2,00,000+ for top performing Campus Ambassadors.",
      backTitle: "₹2,00,000+ Pool",
      backDesc: "Top CAs win cash rewards, monthly stipends, and performance bonuses based on referral leaderboard rank.",
      accent: "#38bdf8"
    },
    {
      icon: Ticket,
      title: "VIP Festival Passes",
      detail: "All-access passes to Pronites, celebrity shows, and comedy nights.",
      backTitle: "All-Access Pass",
      backDesc: "Enjoy front-row VIP access to EDM nights, Bollywood concerts, celebrity keynotes, and exclusive party arenas.",
      accent: "#38bdf8"
    },
    {
      icon: Gift,
      title: "Exclusive Merchandise",
      detail: "Official Techkriti hoodies, t-shirts, badging & premium kits.",
      backTitle: "IITK Merch Swag",
      backDesc: "Receive customized ambassador hoodies, metallic pin badges, laptop stickers, and festival welcome hampers.",
      accent: "#38bdf8"
    },
    {
      icon: Briefcase,
      title: "Internship Offer",
      detail: "Top CAs get direct internship opportunities with partner companies.",
      backTitle: "Corporate Internships",
      backDesc: "Gain fast-tracked interview calls and internship placement offers with Techkriti's sponsor brands and alumni startups.",
      accent: "#38bdf8"
    },
    {
      icon: TrendingUp,
      title: "Skill Bootcamps",
      detail: "Free masterclasses in Digital Marketing, Leadership, & Growth.",
      backTitle: "Executive Mentorship",
      backDesc: "Participate in private mentorship sessions on digital strategy, corporate PR, and leadership with industry pioneers.",
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
          REWARDS & INCENTIVES
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
          REWARDS & <span style={{ color: '#38bdf8', textShadow: '0 0 25px rgba(56, 189, 248, 0.6)' }}>PERKS</span>
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
          Unlock exclusive benefits, certifications, stipends, and VIP privileges backed by IIT Kanpur.
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
        {perks.map((item, idx) => {
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
                      {item.detail}
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
                      PERK DETAILS
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
