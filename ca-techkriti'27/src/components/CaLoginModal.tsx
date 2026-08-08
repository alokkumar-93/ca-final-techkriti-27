import React, { useState } from 'react';
import { insforge } from '../lib/insforge';
import { X, Mail, Lock, LogIn, UserPlus } from 'lucide-react';

interface CaLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string, name: string) => void;
  onSwitchToRegister: () => void;
}

export const CaLoginModal: React.FC<CaLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onSwitchToRegister
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } = await insforge.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
      });

      if (authError) {
        setError(authError.message || 'Invalid email or password. Please try again.');
        setLoading(false);
        return;
      }

      if (data?.user) {
        const meta = (data.user.metadata || {}) as Record<string, string>;
        const userName = meta.full_name || meta.name || '';
        const userEmail = data.user.email || email.trim();
        onLoginSuccess(userEmail, userName);
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
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
        className="liquid-glass animate-portal-tab"
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
          {/* Badge */}
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

          {/* Icon */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.3), rgba(59, 130, 246, 0.3))',
              border: '1.5px solid rgba(56, 189, 248, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.3)'
            }}
          >
            <LogIn size={26} color="#38bdf8" />
          </div>

          <h3
            className="font-tech-heading"
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '0.5rem',
              letterSpacing: '0.04em'
            }}
          >
            Welcome Back
          </h3>

          <p
            style={{
              color: 'hsl(40 6% 82%)',
              fontSize: '0.85rem',
              lineHeight: '1.5',
              marginBottom: '1.75rem',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Log in to your Campus Ambassador account to access your dashboard.
          </p>

          {/* Login Form */}
          <form
            onSubmit={handleLogin}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}
          >
            {/* Email Field */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginBottom: '0.45rem',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                <Mail size={14} color="#38bdf8" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your registered email"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: error ? '1.5px solid #ef4444' : '1.5px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'border-color 0.2s ease'
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginBottom: '0.45rem',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                <Lock size={14} color="#38bdf8" />
                <span>Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: error ? '1.5px solid #ef4444' : '1.5px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'border-color 0.2s ease'
                }}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                style={{
                  padding: '0.6rem 0.85rem',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  textAlign: 'center'
                }}
              >
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '0.25rem',
                width: '100%',
                padding: '0.85rem',
                borderRadius: '14px',
                background: loading
                  ? 'linear-gradient(135deg, #1e3a5f, #1e40af)'
                  : 'linear-gradient(135deg, #0284c7, #2563eb)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.9rem',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 0 20px rgba(56, 189, 248, 0.35), 0 8px 25px rgba(0, 0, 0, 0.4)',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.06em',
                transition: 'all 0.25s ease',
                opacity: loading ? 0.7 : 1
              }}
              className="hover:scale-[1.02] active:scale-[0.98]"
            >
              <LogIn size={18} />
              <span>{loading ? 'Logging in...' : 'Login to Dashboard'}</span>
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              margin: '1.5rem 0'
            }}
          >
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.12)' }} />
            <span
              style={{
                fontSize: '0.72rem',
                color: 'rgba(255, 255, 255, 0.45)',
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              New here?
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.12)' }} />
          </div>

          {/* Switch to Register */}
          <button
            onClick={() => {
              onClose();
              onSwitchToRegister();
            }}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.25s ease'
            }}
            className="hover:scale-[1.02] active:scale-[0.98]"
          >
            <UserPlus size={16} />
            <span>Register as Campus Ambassador</span>
          </button>
        </div>
      </div>
    </div>
  );
};
