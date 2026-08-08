import React, { useState } from 'react';
import { Palette, Megaphone, Cpu, TrendingUp, Briefcase, CheckCircle2, Sparkles } from 'lucide-react';

interface Domain {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  accent: string;
  skills: string[];
  deliverables: string[];
  responsibilities: string;
}

export const CaDomains: React.FC = () => {
  const domains: Domain[] = [
    {
      id: 'creatives',
      title: 'Creatives & Design',
      subtitle: 'Visual Storytelling & Brand Media',
      description: 'Lead visual design and brand aesthetics for Techkriti\'27 in your institution. Craft engaging social media graphics, posters, and digital campaign media.',
      icon: Palette,
      accent: '#3b82f6',
      skills: ['Figma & Photoshop', 'Motion Graphics', 'Reel Editing', 'Visual Identity'],
      deliverables: ['Campus Event Posters', 'Social Media Asset Suite', 'Promotional Banners'],
      responsibilities: 'Produce and curate campus promotional assets, design social media stories for local events, and maintain Techkriti brand consistency.'
    },
    {
      id: 'pr',
      title: 'Public Relations & Outreach',
      subtitle: 'Media Strategy & Campus Liaison',
      description: 'Act as official press and liaison ambassador. Connect with college clubs, faculty deans, and local student publications to build strategic partnerships.',
      icon: Megaphone,
      accent: '#38bdf8',
      skills: ['Public Speaking', 'Media Pitching', 'Press Releases', 'Dean Outreach'],
      deliverables: ['Local Press Releases', 'Inter-College Delegation', 'VIP Speaker Host'],
      responsibilities: 'Represent Techkriti to college administrations, arrange campus announcements, and coordinate inter-college delegation travel.'
    },
    {
      id: 'ops',
      title: 'Event Ops & Execution',
      subtitle: 'Logistics & Workshop Operations',
      description: 'Host pre-fest hackathons, coding contests, and technical workshops in your city. Manage ground logistics, venue setup, and participant registrations.',
      icon: Cpu,
      accent: '#2563eb',
      skills: ['Logistics Ops', 'Workshop Hosting', 'Team Leadership', 'Hospitality'],
      deliverables: ['Pre-Fest Hackathon Host', 'Competitions Desk Ops', 'On-Campus Booths'],
      responsibilities: 'Organize on-campus pre-fest workshops, handle participant check-ins, and ensure seamless execution of local competitions.'
    },
    {
      id: 'growth',
      title: 'Digital Marketing & Growth',
      subtitle: 'Viral Campaigns & Analytics',
      description: 'Drive online registration growth and engagement loops. Execute targeted social campaigns, monitor referral conversion metrics, and optimize reach.',
      icon: TrendingUp,
      accent: '#60a5fa',
      skills: ['Campaign Analytics', 'Content Strategy', 'Viral Reels', 'SEO & Copywriting'],
      deliverables: ['Viral Reel Campaigns', 'Referral Growth Loops', 'Audience Analytics'],
      responsibilities: 'Execute targeted referral campaigns, optimize digital engagement across student groups, and track leaderboard conversion rates.'
    },
    {
      id: 'business',
      title: 'Corporate Sponsorships',
      subtitle: 'Brand Partnerships & B2B',
      description: 'Pitch Techkriti sponsorship decks to local brands, tech startups, and campus partners to secure monetary and gift-in-kind sponsorships.',
      icon: Briefcase,
      accent: '#0ea5e9',
      skills: ['Sponsorship Pitching', 'B2B Sales', 'Contract Negotiation', 'Lead Gen'],
      deliverables: ['Local Brand Sponsors', 'Stall Sponsorship Deals', 'In-Kind Goodie Partners'],
      responsibilities: 'Identify prospective local corporate partners, deliver pitch presentations, and secure sponsorship commitments for college contingents.'
    }
  ];

  const [selectedDomain, setSelectedDomain] = useState<Domain>(domains[0]);

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
      {/* Royal Blue Ambient Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '35%',
          left: '10%',
          width: '750px',
          height: '450px',
          opacity: 0.25,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(56, 189, 248, 0.15) 50%, rgba(5, 3, 11, 0.95) 80%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />

      {/* Header with 3D Entrance */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="reveal-3d-pop">
        <span 
          style={{ 
            display: 'inline-block', 
            padding: '0.4rem 1.25rem', 
            borderRadius: '9999px', 
            fontSize: '0.75rem', 
            fontWeight: 800, 
            color: '#38bdf8', 
            textTransform: 'uppercase', 
            letterSpacing: '0.2em',
            background: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            marginBottom: '1rem'
          }}
          className="font-tech-sub"
        >
          Specialized Ambassador Tracks
        </span>

        <h2 
          className="font-tech-heading"
          style={{ 
            fontSize: 'clamp(2.25rem, 5vw, 4.25rem)', 
            fontWeight: 800, 
            color: '#ffffff', 
            margin: '0 0 1rem', 
            letterSpacing: '0.04em' 
          }}
        >
          EXPLORE AMBASSADOR <span style={{ color: '#38bdf8', textShadow: '0 0 20px rgba(56, 189, 248, 0.6)' }}>DOMAINS</span>
        </h2>

        <p 
          style={{ 
            color: 'hsl(40 6% 85%)', 
            fontSize: '1.05rem', 
            maxWidth: '44rem', 
            margin: '0 auto',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          Choose a domain aligned with your skills and passions. Lead dedicated initiatives in Design, Public Relations, Operations, Growth, or Corporate Partnerships.
        </p>
      </div>

      {/* Domain Selection Pills Bar with 3D Entrance */}
      <div 
        className="reveal-3d-pop"
        style={{
          display: 'flex',
          gap: '0.75rem',
          overflowX: 'auto',
          paddingBottom: '1rem',
          marginBottom: '2.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}
      >
        {domains.map((domain) => {
          const isSelected = selectedDomain.id === domain.id;
          const Icon = domain.icon;

          return (
            <button
              key={domain.id}
              onClick={() => setSelectedDomain(domain)}
              className="font-tech-sub"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                background: isSelected 
                  ? `linear-gradient(135deg, ${domain.accent}35, rgba(8, 14, 28, 0.9))` 
                  : 'rgba(255, 255, 255, 0.05)',
                border: isSelected 
                  ? `1.5px solid ${domain.accent}` 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                color: isSelected ? '#ffffff' : 'rgba(242, 241, 240, 0.75)',
                fontSize: '0.8rem',
                fontWeight: isSelected ? 800 : 700,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isSelected ? `0 0 20px ${domain.accent}40` : 'none'
              }}
            >
              <Icon size={18} color={isSelected ? domain.accent : 'rgba(255,255,255,0.6)'} />
              <span>{domain.title}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Domain Showcase Panel with 3D Entrance & 3D Tilt Hover */}
      <div 
        className="liquid-glass reveal-3d-pop"
        style={{
          borderRadius: '1.75rem',
          padding: '2.5rem',
          border: `1px solid ${selectedDomain.accent}45`,
          background: 'linear-gradient(145deg, rgba(8, 20, 42, 0.92), rgba(5, 10, 24, 0.98))',
          boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 30px ${selectedDomain.accent}20`,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Domain Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '16px', 
                  background: `${selectedDomain.accent}20`, 
                  border: `1px solid ${selectedDomain.accent}40`,
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: selectedDomain.accent,
                  boxShadow: `0 0 20px ${selectedDomain.accent}30`
                }}
              >
                <selectedDomain.icon size={28} />
              </div>
              <div>
                <h3 className="font-tech-sub" style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '0.04em' }}>
                  {selectedDomain.title}
                </h3>
                <span style={{ fontSize: '0.85rem', color: selectedDomain.accent, fontWeight: 600 }}>
                  {selectedDomain.subtitle}
                </span>
              </div>
            </div>

            <p style={{ color: 'hsl(40 6% 85%)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.75rem' }}>
              {selectedDomain.description}
            </p>

            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.25rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="font-tech-sub" style={{ fontSize: '0.75rem', fontWeight: 800, color: selectedDomain.accent, display: 'block', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                Key Responsibilities
              </span>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', lineHeight: '1.6', margin: 0 }}>
                {selectedDomain.responsibilities}
              </p>
            </div>
          </div>

          {/* Domain Skills & Deliverables */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Skills Track */}
            <div>
              <h4 className="font-tech-sub" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.85rem', letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={14} color={selectedDomain.accent} />
                Key Skills Developed
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selectedDomain.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.9)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <h4 className="font-tech-sub" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.85rem', letterSpacing: '0.12em' }}>
                Core Deliverables
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {selectedDomain.deliverables.map((item, dIdx) => (
                  <div key={dIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem' }}>
                    <CheckCircle2 size={16} color={selectedDomain.accent} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
