import React, { useState, useEffect, useRef } from 'react';
import { Home, Info, Award, CheckSquare, Gift, Camera, BarChart3, HelpCircle, LogIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface FloatingRightDockProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onSignUpClick: () => void;
}

export const FloatingRightDock: React.FC<FloatingRightDockProps> = ({
  activeTab,
  onTabChange,
  onSignUpClick
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeToastId, setActiveToastId] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    const handleScroll = () => {
      // Show floating right dock when scrolled past 200px
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsMobileOpen(false); // Close mobile drawer when near top hero
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const triggerClickToast = (id: string) => {
    setActiveToastId(id);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setActiveToastId(null);
    }, 2200);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, color: '#38bdf8' },
    { id: 'about', label: 'About CA', icon: Info, color: '#3b82f6' },
    { id: 'techkriti-overview', label: 'Techkriti', icon: Award, color: '#38bdf8' },
    { id: 'responsibilities', label: 'Tasks', icon: CheckSquare, color: '#3b82f6' },
    { id: 'incentives', label: 'Perks', icon: Gift, color: '#38bdf8' },
    { id: 'gallery', label: 'Festival Gallery', icon: Camera, color: '#38bdf8' },
    { id: 'reach', label: 'Our Reach', icon: BarChart3, color: '#38bdf8' },
    { id: 'faq', label: 'FAQ', icon: HelpCircle, color: '#3b82f6' }
  ];

  // Calculate mobile slide transform: hidden off-screen to the right by default on phones
  const mobileTransform = isMobileScreen && !isMobileOpen ? 'translateX(calc(100% + 20px))' : 'translateX(0)';

  return (
    <div
      style={{
        position: 'fixed',
        right: isVisible ? '0.75rem' : '-100px',
        top: '50%',
        transform: `translateY(-50%) ${mobileTransform}`,
        zIndex: 60,
        transition: 'right 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      className="flex flex-col items-center gap-1.5 p-1.5 rounded-2xl liquid-glass border border-white/15 shadow-2xl"
    >
      {/* Mobile Pull Tab Handle (Only rendered on mobile screens < 768px) */}
      {isMobileScreen && (
        <button
          onClick={() => setIsMobileOpen((prev) => !prev)}
          style={{
            position: 'absolute',
            left: '-34px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '34px',
            height: '56px',
            borderTopLeftRadius: '12px',
            borderBottomLeftRadius: '12px',
            background: 'linear-gradient(135deg, rgba(8, 20, 42, 0.95), rgba(5, 10, 24, 0.98))',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            borderRight: 'none',
            color: '#38bdf8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '-4px 0 15px rgba(56, 189, 248, 0.35), -2px 0 10px rgba(0, 0, 0, 0.6)',
            cursor: 'pointer',
            zIndex: 65
          }}
          aria-label={isMobileOpen ? 'Collapse right menu' : 'Pull out right menu'}
        >
          {isMobileOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      )}

      {/* Quick Nav Buttons */}
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        const isHovered = hoveredId === item.id;
        const isClickedToast = activeToastId === item.id;
        const isPillVisible = isHovered || isClickedToast;

        return (
          <div key={item.id} className="relative group">
            <button
              onClick={() => {
                onTabChange(item.id);
                triggerClickToast(item.id);
                if (isMobileScreen) setIsMobileOpen(false); // Auto-close menu on phone tap
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isActive 
                  ? `${item.color}35` 
                  : isHovered 
                  ? 'rgba(255, 255, 255, 0.12)' 
                  : 'rgba(255, 255, 255, 0.05)',
                border: isActive 
                  ? `1.5px solid ${item.color}` 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                boxShadow: isActive ? `0 0 15px ${item.color}60` : 'none',
                transition: 'all 0.25s ease'
              }}
              aria-label={item.label}
            >
              <Icon size={18} color={isActive ? '#38bdf8' : 'currentColor'} />
            </button>

            {/* Floating Tooltip Label */}
            {isPillVisible && (
              <div
                style={{
                  position: 'absolute',
                  right: '48px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  whiteSpace: 'nowrap',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  background: 'rgba(5, 12, 25, 0.95)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6), 0 0 10px rgba(56, 189, 248, 0.2)',
                  pointerEvents: 'none',
                  animation: 'fadeIn 0.2s ease-out'
                }}
                className="font-tech-sub"
              >
                {item.label}
              </div>
            )}
          </div>
        );
      })}

      {/* Divider */}
      <div style={{ width: '20px', height: '1px', background: 'rgba(255, 255, 255, 0.15)', margin: '0.2rem 0' }} />

      {/* Register / Sign In Quick Button */}
      <div className="relative group">
        <button
          onClick={() => {
            onSignUpClick();
            if (isMobileScreen) setIsMobileOpen(false); // Auto-close menu on phone tap
          }}
          onMouseEnter={() => setHoveredId('register')}
          onMouseLeave={() => setHoveredId(null)}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.4), rgba(59, 130, 246, 0.4))',
            border: '1.5px solid #38bdf8',
            color: '#ffffff',
            boxShadow: '0 0 15px rgba(56, 189, 248, 0.5)',
            transition: 'all 0.25s ease'
          }}
          aria-label="Register Now"
        >
          <LogIn size={18} color="#ffffff" />
        </button>

        {hoveredId === 'register' && (
          <div
            style={{
              position: 'absolute',
              right: '48px',
              top: '50%',
              transform: 'translateY(-50%)',
              whiteSpace: 'nowrap',
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #0284c7, #2563eb)',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: 800,
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6), 0 0 15px rgba(56, 189, 248, 0.4)',
              pointerEvents: 'none'
            }}
            className="font-tech-sub"
          >
            REGISTER NOW
          </div>
        )}
      </div>
    </div>
  );
};
