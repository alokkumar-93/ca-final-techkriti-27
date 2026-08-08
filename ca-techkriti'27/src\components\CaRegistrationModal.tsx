import React, { useState } from 'react';
import { insforge } from '../lib/insforge';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleSuccess: (email: string, name: string) => void;
}

export const CaRegistrationModal: React.FC<ModalProps> = ({ isOpen, onClose, onGoogleSuccess }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    // Mark pending google auth so if browser reloads, it stays on registration form/CA portal
    localStorage.setItem('techkriti_pending_google_auth', 'true');

    try {
      await insforge.auth.signInWithOAuth({
        provider: 'google',
        redirectTo: window.location.origin
      }).catch(() => null);
    } catch {
      // ignore redirect error
    }

    // The OAuth call triggers a browser redirect. This setTimeout is a fallback
    // in case the redirect doesn't happen (e.g., popup blocked). On redirect back,
    // App.tsx useEffect handles reopening the registration form or dashboard.
    setTimeout(() => {
      setLoading(false);
      onGoogleSuccess('', '');
    }, 2000);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
    >
      <div 
        className="liquid-glass"
        style={{
          width: '100%',
          maxWidth: '26rem',
          padding: '2.25rem 1.75rem',
          borderRadius: '24px',
          position: 'relative',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(59, 130, 246, 0.25)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'rgba(242, 241, 240, 0.7)',
            cursor: 'pointer',
            padding: '0.25rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
          <span 
            className="liquid-glass font-tech-sub" 
            style={{
              display: 'inline-block',
              padding: '0.3rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              fontWeight: 800,
              color: '#38bdf8',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '0.75rem',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              background: 'rgba(56, 189, 248, 0.12)'
            }}
          >
            TECHKRITI'27 CA PORTAL
          </span>
          
          <h3 className="font-tech-heading" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
            Sign In with Google
          </h3>
          
          <p style={{ color: 'hsl(40 6% 82%)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
            Sign in with your Google account to access your official Techkriti'27 Campus Ambassador Portal & Registration Form.
          </p>

          {/* Official Google OAuth Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              color: '#111827',
              fontWeight: 700,
              padding: '0.9rem 1rem',
              borderRadius: '14px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.25)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem'
            }}
            className="hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg style={{ width: '22px', height: '22px' }} viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{loading ? 'Connecting Google Account...' : 'Continue with Google'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
