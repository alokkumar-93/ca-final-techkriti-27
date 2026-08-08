import { useState, useEffect, useRef } from 'react';
import type { UserProfile } from './types/user';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { AboutTechkritiSection } from './components/AboutTechkritiSection';
import { CaResponsibilities } from './components/CaResponsibilities';
import { CaIncentives } from './components/CaIncentives';
import { TechkritiEventsGallery } from './components/TechkritiEventsGallery';
import { CaTestimonialsSection } from './components/CaTestimonialsSection';
import { OurReachSection } from './components/OurReachSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { CaRegistrationModal } from './components/CaRegistrationModal';
import { CaRegisterFormModal } from './components/CaRegisterFormModal';
import { CaDashboard } from './components/CaDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { InteractiveGlowBackground } from './components/InteractiveGlowBackground';
import { GlassySparklesBackground } from './components/GlassySparklesBackground';
import { FloatingRightDock } from './components/FloatingRightDock';
import { FuturisticPreloader } from './components/FuturisticPreloader';
import { TechkritiLogo } from './components/TechkritiLogo';
import { Menu, X, ShieldCheck, Mail, Lock, LogIn, Home } from 'lucide-react';

const NAV_TABS = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT CA' },
  { id: 'incentives', label: 'INCENTIVES' },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'reach', label: 'REACH' },
  { id: 'contact', label: 'CONTACT US' },
];

const MOBILE_NAV_TABS = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT CA' },
  { id: 'techkriti-overview', label: 'TECHKRITI' },
  { id: 'responsibilities', label: 'TASKS' },
  { id: 'incentives', label: 'WHY CA' },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'testimonials', label: 'REVIEWS' },
  { id: 'reach', label: 'OUR REACH' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'CONTACT US' },
];

export function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);
  const [viewingDashboard, setViewingDashboard] = useState(false);
  const [viewingAdminDashboard, setViewingAdminDashboard] = useState<boolean>(() => {
    return sessionStorage.getItem('techkriti_admin_logged_in') === 'true';
  });
  const [isAdminPasscodeModalOpen, setIsAdminPasscodeModalOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // User Profile state with localStorage persistence
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('techkriti_ca_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const handleOpenAuth = () => {
    if (userProfile && userProfile.isRegistered) {
      setViewingDashboard(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleGoogleSuccess = (_email: string, _name: string) => {
    setIsAuthModalOpen(false);
    setIsRegisterFormOpen(true);
  };

  const handleProfileSubmitted = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('techkriti_ca_user_profile', JSON.stringify(profile));
    setIsRegisterFormOpen(false);
    setViewingDashboard(true);
  };

  const handleLogout = () => {
    setUserProfile(null);
    localStorage.removeItem('techkriti_ca_user_profile');
    sessionStorage.removeItem('techkriti_admin_logged_in');
    setViewingDashboard(false);
    setViewingAdminDashboard(false);
  };

  const handleAdminPasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = adminEmail.trim().toUpperCase();
    const pass = adminPasscode.trim().toUpperCase();
    if ((email === 'ADMIN' && pass === 'ADMIN') || pass === 'TECHKRITI27_ADMIN' || pass === 'ADMIN') {
      sessionStorage.setItem('techkriti_admin_logged_in', 'true');
      setIsAdminPasscodeModalOpen(false);
      setViewingAdminDashboard(true);
      setPasscodeError(false);
      setAdminPasscode('');
    } else {
      setPasscodeError(true);
    }
  };

  // Check for pending Google OAuth redirect and secret /admin route on mount
  useEffect(() => {
    const isAdminRoute = window.location.search.includes('admin') || window.location.hash.includes('admin') || window.location.pathname.includes('/admin');
    const isLoggedIn = sessionStorage.getItem('techkriti_admin_logged_in') === 'true';

    if (isAdminRoute && !isLoggedIn) {
      setIsAdminPasscodeModalOpen(true);
    } else if (isAdminRoute && isLoggedIn) {
      setViewingAdminDashboard(true);
    }

    const pending = localStorage.getItem('techkriti_pending_google_auth');
    if (pending === 'true') {
      localStorage.removeItem('techkriti_pending_google_auth');
      setIsAuthModalOpen(false);
      
      // Check if user already registered
      const saved = localStorage.getItem('techkriti_ca_user_profile');
      if (saved) {
        setViewingDashboard(true);
      } else {
        setIsRegisterFormOpen(true);
      }
    }
  }, []);

  // Active section observer & Rock-Solid 3D Scroll Reveal Observer
  useEffect(() => {
    const sectionIds = ['home', 'about', 'techkriti-overview', 'responsibilities', 'incentives', 'gallery', 'testimonials', 'reach', 'faq', 'contact'];
    let ticking = false;

    const handleSectionObserver = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + window.innerHeight * 0.35;

          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const secId = sectionIds[i];
            const el = document.getElementById(secId);
            if (el) {
              const top = el.offsetTop;
              if (scrollPosition >= top) {
                setActiveTab(secId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleSectionObserver, { passive: true });
    handleSectionObserver();

    // 3D Scroll Reveal Observer with threshold 0.01
    const revealElements = document.querySelectorAll('.reveal-3d-pop, .reveal-3d-left, .reveal-3d-right');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.01, rootMargin: '100px 0px 100px 0px' });

    revealElements.forEach(el => {
      el.classList.add('active');
      el.classList.add('is-visible');
      revealObserver.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleSectionObserver);
      revealObserver.disconnect();
    };
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render Admin Control Panel Dashboard when unlocked
  if (viewingAdminDashboard) {
    return (
      <AdminDashboard
        onLogout={() => setViewingAdminDashboard(false)}
        onGoHome={() => setViewingAdminDashboard(false)}
        onGoCaPortal={() => {
          setViewingAdminDashboard(false);
          setViewingDashboard(true);
        }}
      />
    );
  }

  // If user is viewing the CA Portal Dashboard after login/registration matching Image 2:
  if (viewingDashboard && userProfile) {
    return (
      <CaDashboard
        userProfile={userProfile}
        onLogout={handleLogout}
        onGoHome={() => setViewingDashboard(false)}
      />
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#05030b', overflowX: 'hidden' }}>
      
      {/* 0. Futuristic Preloader intro on initial load */}
      {isLoading && (
        <FuturisticPreloader onComplete={() => setIsLoading(false)} />
      )}

      {/* Dynamic Cursor Light Glow & Background Animations */}
      <InteractiveGlowBackground />
      <GlassySparklesBackground />

      {/* Rock-Solid Transparent Sticky Header Navigation */}
      <NavbarSticky 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        onSignUpClick={handleOpenAuth} 
        userProfile={userProfile}
      />

      {/* 1. HERO SECTION */}
      <div id="home">
        <HeroSection onCtaClick={handleOpenAuth} />
      </div>

      {/* Glassy Section Divider 1 */}
      <div className="glassy-divider" />

      {/* 2. ABOUT CAMPUS AMBASSADOR PROGRAM SECTION */}
      <div id="about" style={{ position: 'relative', zIndex: 5 }}>
        <div className="spreading-aura" style={{ top: '20%', left: '-5%', width: '1100px', height: '1100px', background: 'radial-gradient(circle, rgba(56,189,248,0.65) 0%, rgba(59,130,246,0.2) 60%, transparent 80%)', animationDelay: '1s' }} />
        <AboutSection />
      </div>

      {/* Glassy Section Divider 2 */}
      <div className="glassy-divider" />

      {/* 3. ABOUT TECHKRITI '27 FESTIVAL OVERVIEW */}
      <div id="techkriti-overview" style={{ position: 'relative', zIndex: 5 }}>
        <div className="spreading-aura" style={{ top: '10%', right: '-5%', width: '1000px', height: '1000px', background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)', animationDelay: '4s' }} />
        <AboutTechkritiSection />
      </div>

      {/* Glassy Section Divider 3 */}
      <div className="glassy-divider" />

      {/* 4. CA RESPONSIBILITIES & TASKS */}
      <div id="responsibilities" style={{ position: 'relative', zIndex: 5 }}>
        <div className="spreading-aura" style={{ top: '25%', left: '50%', transform: 'translateX(-50%)', width: '1250px', height: '1250px', background: 'radial-gradient(circle, rgba(56,189,248,0.6) 0%, rgba(59,130,246,0.3) 50%, transparent 80%)', animationDelay: '2s' }} />
        <CaResponsibilities />
      </div>

      {/* Glassy Section Divider 4 */}
      <div className="glassy-divider" />

      {/* 4.2 WHY BECOME A CAMPUS AMBASSADOR? (PERKS & INCENTIVES) */}
      <div id="incentives" style={{ position: 'relative', zIndex: 5 }}>
        <div className="spreading-aura" style={{ top: '10%', right: '-8%', width: '1150px', height: '1150px', background: 'radial-gradient(circle, rgba(59,130,246,0.65) 0%, transparent 75%)', animationDelay: '5s' }} />
        <CaIncentives />
      </div>

      {/* Glassy Section Divider 4.2 */}
      <div className="glassy-divider" />

      {/* 4.5 TECHKRITI EVENTS PHOTO GALLERY */}
      <div id="gallery" style={{ position: 'relative', zIndex: 5 }}>
        <div className="spreading-aura" style={{ top: '15%', left: '-8%', width: '1200px', height: '1200px', background: 'radial-gradient(circle, rgba(56,189,248,0.6) 0%, rgba(59,130,246,0.2) 60%, transparent 80%)', animationDelay: '3s' }} />
        <TechkritiEventsGallery />
      </div>

      {/* Glassy Section Divider 4.5 */}
      <div className="glassy-divider" />

      {/* 5. Ambassador Reviews / Testimonials Section ("What Our Ambassadors Say") */}
      <div id="testimonials" style={{ position: 'relative', zIndex: 5 }}>
        <div className="spreading-aura" style={{ top: '15%', left: '50%', transform: 'translateX(-50%)', width: '1100px', height: '1100px', background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 75%)', animationDelay: '3s' }} />
        <CaTestimonialsSection />
      </div>

      {/* Glassy Section Divider 5.5 */}
      <div className="glassy-divider" />

      {/* 6. OUR REACH SECTION */}
      <div id="reach" style={{ position: 'relative', zIndex: 5 }}>
        <div className="spreading-aura" style={{ top: '10%', right: '-8%', width: '1150px', height: '1150px', background: 'radial-gradient(circle, rgba(59,130,246,0.65) 0%, rgba(56,189,248,0.25) 55%, transparent 80%)', animationDelay: '2s' }} />
        <OurReachSection />
      </div>

      {/* Glassy Section Divider 6 */}
      <div className="glassy-divider" />

      {/* 7. FAQ Section */}
      <div id="faq" style={{ position: 'relative', zIndex: 5 }}>
        <div className="spreading-aura" style={{ top: '5%', right: '-8%', width: '1050px', height: '1050px', background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 75%)', animationDelay: '5s' }} />
        <FaqSection />
      </div>

      {/* Glassy Section Divider 7 */}
      <div className="glassy-divider" />

      {/* Contact & Footer Section */}
      <div id="contact" style={{ position: 'relative', zIndex: 5 }}>
        <ContactSection onTabChange={handleTabChange} onSignUpClick={handleOpenAuth} />
      </div>

      {/* Floating Right Dock Bar */}
      <FloatingRightDock
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSignUpClick={handleOpenAuth}
      />

      {/* Sign Up / OAuth Google Modal */}
      <CaRegistrationModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onGoogleSuccess={handleGoogleSuccess}
      />

      {/* Profile Registration Form Modal matching Image 1 */}
      <CaRegisterFormModal
        isOpen={isRegisterFormOpen}
        onClose={() => setIsRegisterFormOpen(false)}
        onSubmitProfile={handleProfileSubmitted}
      />

      {/* Admin Login Modal (Matching Reference Screenshot 1:1) */}
      {isAdminPasscodeModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(5, 3, 11, 0.85)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div 
            className="animate-portal-tab" 
            style={{ 
              width: '100%', 
              maxWidth: '27rem', 
              borderRadius: '1.5rem', 
              backgroundColor: '#ffffff', 
              padding: '2.5rem 2.25rem', 
              color: '#1e1b4b', 
              textAlign: 'center', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative' 
            }}
          >
            <button
              onClick={() => setIsAdminPasscodeModalOpen(false)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            {/* Blue Shield Icon Circle */}
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#1e1b4b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 10px 25px rgba(30, 27, 75, 0.3)' }}>
              <ShieldCheck size={32} color="#ffffff" />
            </div>

            <h3 className="font-tech-heading" style={{ fontSize: '1.85rem', fontWeight: 900, margin: '0 0 0.4rem', color: '#1e1b4b', letterSpacing: '0.02em' }}>
              Admin Login
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1.75rem', fontWeight: 600 }}>
              Sign in to access the Techkriti'27 admin dashboard
            </p>

            <form onSubmit={handleAdminPasscodeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
              
              {/* Field 1: Admin Email */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '0.5rem' }}>
                  <Mail size={15} color="#1e1b4b" />
                  <span>Admin Email</span>
                </label>
                <input
                  type="text"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="Enter Admin Email or User ID"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#eef2ff',
                    border: '1.5px solid #312e81',
                    borderRadius: '12px',
                    color: '#1e1b4b',
                    fontSize: '0.925rem',
                    fontWeight: 600,
                    outline: 'none'
                  }}
                />
              </div>

              {/* Field 2: Password */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '0.5rem' }}>
                  <Lock size={15} color="#1e1b4b" />
                  <span>Password</span>
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#eef2ff',
                    border: passcodeError ? '1.5px solid #ef4444' : '1.5px solid #312e81',
                    borderRadius: '12px',
                    color: '#1e1b4b',
                    fontSize: '0.925rem',
                    fontWeight: 600,
                    outline: 'none'
                  }}
                />
                {passcodeError && (
                  <div style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 700, marginTop: '0.35rem' }}>
                    Incorrect email or password. Please try again.
                  </div>
                )}
              </div>

              {/* Action Button: Admin Sign In */}
              <button
                type="submit"
                style={{
                  marginTop: '0.5rem',
                  width: '100%',
                  padding: '0.9rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)'
                }}
                className="hover:scale-[1.02] active:scale-95 transition-transform"
              >
                <LogIn size={18} />
                <span>Admin Sign In</span>
              </button>
            </form>

            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 0.85rem', fontWeight: 500 }}>
                This page is restricted to administrators only.
              </p>

              <button
                onClick={() => setIsAdminPasscodeModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1e1b4b',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
                className="hover:underline"
              >
                <Home size={15} />
                <span>Return to Home</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

/* Rock-Solid Transparent Glassy Sticky Navbar Component */
function NavbarSticky({
  activeTab,
  onTabChange,
  onSignUpClick,
  userProfile
}: {
  activeTab: string;
  onTabChange: (t: string) => void;
  onSignUpClick: () => void;
  userProfile: UserProfile | null;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const diff = currentScrollY - prevScrollY.current;

          if (currentScrollY > 150 && diff > 15) {
            setIsVisible(false);
            setMobileMenuOpen(false);
          } else if (diff < -12 || currentScrollY <= 70) {
            setIsVisible(true);
          }

          prevScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      style={{ 
        width: '100%', 
        position: 'fixed', 
        top: 0, 
        left: 0,
        zIndex: 50, 
        backdropFilter: 'blur(20px)', 
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform'
      }}
    >
      <nav style={{ width: '100%', padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1350px', margin: '0 auto' }}>
        
        {/* Official Techkriti Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => { onTabChange('home'); setMobileMenuOpen(false); }}>
          <TechkritiLogo height={30} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="font-tech-sub" style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.15em', color: '#ffffff', lineHeight: 1.1 }}>
              TECHKRITI
            </span>
            <span className="font-tech-sub" style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.1 }}>
              IIT KANPUR
            </span>
          </div>
        </div>

        {/* Center Glass Navbar Pill Container */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '0.25rem', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '9999px', padding: '0.35rem 0.6rem', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
          {NAV_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button 
                key={tab.id} 
                onClick={() => onTabChange(tab.id)}
                className="font-tech-sub"
                style={{
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(56, 189, 248, 0.5))' 
                    : 'transparent',
                  border: isActive 
                    ? '1px solid rgba(56, 189, 248, 0.7)' 
                    : '1px solid transparent',
                  borderRadius: '9999px', 
                  padding: '0.4rem 1.15rem',
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                  fontSize: '0.775rem', 
                  fontWeight: isActive ? 800 : 700, 
                  letterSpacing: '0.12em',
                  cursor: 'pointer',
                  boxShadow: isActive 
                    ? '0 0 15px rgba(56, 189, 248, 0.5)' 
                    : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Desktop Register / Dashboard CTA Button */}
        <div className="hidden md:block">
          <button 
            onClick={onSignUpClick}
            className="font-tech-sub hover:scale-105 active:scale-95"
            style={{ 
              background: userProfile ? 'linear-gradient(135deg, #0284c7, #2563eb)' : 'linear-gradient(135deg, #3b82f6, #06b6d4)', 
              border: 'none', 
              borderRadius: '9999px', 
              padding: '0.55rem 1.35rem', 
              fontSize: '0.8rem', 
              fontWeight: 800, 
              letterSpacing: '0.12em',
              cursor: 'pointer', 
              color: '#ffffff', 
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
              transition: 'all 0.25s ease'
            }}
          >
            {userProfile ? 'CA DASHBOARD' : 'REGISTER NOW'}
          </button>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '10px',
              padding: '0.45rem',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Top Slide-In Dropdown Menu */}
      {mobileMenuOpen && (
        <div 
          style={{ 
            backgroundColor: 'rgba(8, 14, 28, 0.92)', 
            borderTop: '1px solid rgba(255, 255, 255, 0.15)', 
            padding: '1.25rem 1.5rem', 
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)'
          }}
          className="md:hidden animate-fade-in-up"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {MOBILE_NAV_TABS.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className="animate-slide-in-top font-tech-sub"
                  style={{
                    animationDelay: `${idx * 0.05}s`,
                    textAlign: 'left',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '12px',
                    background: isActive ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(56, 189, 248, 0.4))' : 'rgba(255, 255, 255, 0.06)',
                    border: isActive ? '1px solid rgba(56, 189, 248, 0.6)' : '1px solid rgba(255, 255, 255, 0.12)',
                    color: isActive ? '#ffffff' : 'rgba(242, 241, 240, 0.9)',
                    fontWeight: isActive ? 800 : 700,
                    fontSize: '0.85rem',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
            
            <button
              onClick={() => {
                onSignUpClick();
                setMobileMenuOpen(false);
              }}
              className="animate-slide-in-top font-tech-sub"
              style={{
                animationDelay: `${MOBILE_NAV_TABS.length * 0.05}s`,
                marginTop: '0.5rem',
                width: '100%',
                padding: '0.85rem',
                borderRadius: '12px',
                background: userProfile ? 'linear-gradient(135deg, #0284c7, #2563eb)' : 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                border: 'none',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.9rem',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
              }}
            >
              {userProfile ? 'CA DASHBOARD' : 'REGISTER NOW'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default App;
