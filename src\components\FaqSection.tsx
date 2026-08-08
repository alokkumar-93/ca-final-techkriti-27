import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "Who is eligible to apply for the Campus Ambassador Program?",
      answer: "Any student currently enrolled in an undergraduate or postgraduate degree program (B.Tech, B.Sc, B.BA, B.A, M.Tech, MBA, etc.) at any recognized college or university across India is eligible to apply."
    },
    {
      question: "Will I receive a physical certificate from IIT Kanpur?",
      answer: "Yes! All active Campus Ambassadors who achieve their baseline outreach milestones receive an official Certificate of Appreciation signed by the festival chairpersons and IIT Kanpur faculty."
    },
    {
      question: "What is the expected weekly time commitment?",
      answer: "The program requires approximately 3–5 hours per week. Tasks are flexible and designed around your academic schedule, focusing on digital outreach, campus poster distribution, and student coordination."
    },
    {
      question: "How are cash prizes and stipends awarded?",
      answer: "Cash rewards and stipends from the ₹2,00,000+ total prize pool are distributed to top-performing Ambassadors based on referral points, workshop execution, and contingent size."
    },
    {
      question: "Can I apply if my college already has a Campus Ambassador?",
      answer: "Yes! Colleges can have multiple Ambassadors. Ambassadors in the same college can either collaborate as a team or lead independent student contingents."
    },
    {
      question: "Is accommodation provided during Techkriti'27 at IIT Kanpur?",
      answer: "Yes! Top performing Campus Ambassadors and their contingent members receive priority accommodation inside the IIT Kanpur hostel campus during the 4 festival days."
    },
    {
      question: "What are the perks of leading a College Contingent?",
      answer: "Contingent Leaders who bring 15+ participating students to IIT Kanpur receive free VIP Festival Passes, complimentary accommodation, exclusive Techkriti hoodies, and direct networking access."
    },
    {
      question: "Can first-year or diploma students apply?",
      answer: "Absolutely! First-year students and diploma candidates are highly encouraged to apply. It is a fantastic opportunity to build leadership and marketing skills early in your college career."
    },
    {
      question: "Is there any registration fee to join the CA Program?",
      answer: "No! The Techkriti'27 Campus Ambassador Program is 100% free of charge. There are no hidden fees or registration costs to become an official ambassador."
    },
    {
      question: "How do I track my points and referral performance?",
      answer: "Once registered, you get access to your personal CA Dashboard where you can copy your unique referral code, track real-time student sign-ups, and monitor leaderboard standings."
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section 
      id="faq"
      style={{
        padding: '5.5rem 1.5rem',
        maxWidth: '56rem',
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
          width: '700px',
          height: '400px',
          opacity: 0.3,
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(59, 130, 246, 0.25) 50%, rgba(5, 3, 11, 0.95) 80%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      {/* Header matching exact site-wide section styling */}
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
          GOT QUESTIONS?
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
          FREQUENTLY ASKED <span style={{ color: '#38bdf8', textShadow: '0 0 25px rgba(56, 189, 248, 0.6)' }}>QUESTIONS</span>
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
          Everything you need to know about joining Techkriti'27 Campus Ambassador program.
        </p>
      </div>

      {/* Accordion List with Alternating 3D Side Entrance */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const revealClass = idx % 2 === 0 ? 'reveal-3d-left' : 'reveal-3d-right';

          return (
            <div 
              key={idx}
              className={`liquid-glass ${revealClass}`}
              style={{
                borderRadius: '1.25rem',
                overflow: 'hidden',
                border: isOpen ? '1.5px solid #38bdf8' : '1px solid rgba(56, 189, 248, 0.35)',
                background: isOpen ? 'linear-gradient(145deg, rgba(8, 20, 42, 0.95), rgba(5, 10, 24, 0.98))' : 'rgba(8, 14, 28, 0.75)',
                boxShadow: isOpen ? '0 15px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(56, 189, 248, 0.25)' : '0 10px 25px rgba(0, 0, 0, 0.5)',
                transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <button
                onClick={() => toggleFaq(idx)}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  textAlign: 'left',
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                <span 
                  className="font-tech-heading" 
                  style={{ 
                    fontSize: '1.15rem', 
                    fontWeight: 700, 
                    color: isOpen ? '#38bdf8' : '#ffffff',
                    letterSpacing: '0.01em',
                    transition: 'color 0.25s ease'
                  }}
                >
                  {faq.question}
                </span>

                <div 
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isOpen ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isOpen ? '#38bdf8' : 'rgba(255, 255, 255, 0.6)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease, background 0.3s ease, color 0.3s ease',
                    flexShrink: 0
                  }}
                >
                  <ChevronDown size={18} />
                </div>
              </button>

              {isOpen && (
                <div 
                  style={{
                    padding: '0 1.5rem 1.5rem',
                    color: 'hsl(40 6% 85%)',
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    fontFamily: 'Inter, sans-serif',
                    borderTop: '1px solid rgba(56, 189, 248, 0.15)',
                    paddingTop: '1rem'
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
