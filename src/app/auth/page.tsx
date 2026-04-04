'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type AuthMode = 'login' | 'signup';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/');
        router.refresh();
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setSuccess('Account created! Check your email to confirm your account.');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError(null);
    setSuccess(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          background: #0a0e1a;
          position: relative;
          overflow: hidden;
        }

        /* Animated background blobs */
        .auth-root::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(37,70,253,0.25) 0%, transparent 70%);
          top: -150px;
          left: -150px;
          border-radius: 50%;
          animation: blobMove1 8s ease-in-out infinite alternate;
        }
        .auth-root::after {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%);
          bottom: -100px;
          right: -100px;
          border-radius: 50%;
          animation: blobMove2 10s ease-in-out infinite alternate;
        }

        @keyframes blobMove1 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(80px, 60px) scale(1.15); }
        }
        @keyframes blobMove2 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-60px, -80px) scale(1.1); }
        }

        .auth-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          margin: 1.5rem;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow:
            0 0 0 1px rgba(37,70,253,0.15),
            0 32px 64px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255,255,255,0.08);
          animation: cardIn 0.5s cubic-bezier(0.34, 1.3, 0.64, 1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .auth-logo {
          text-align: center;
          margin-bottom: 2rem;
        }
        .auth-logo-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #2546fd, #8b5cf6);
          border-radius: 16px;
          font-size: 1.8rem;
          margin-bottom: 0.75rem;
          box-shadow: 0 8px 24px rgba(37,70,253,0.4);
        }
        .auth-logo h1 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .auth-logo p {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.45);
          margin-top: 0.2rem;
        }

        /* Tab switcher */
        .auth-tabs {
          display: flex;
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 1.75rem;
          gap: 4px;
        }
        .auth-tab {
          flex: 1;
          padding: 0.55rem 1rem;
          border: none;
          border-radius: 9px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          background: transparent;
          color: rgba(255,255,255,0.45);
        }
        .auth-tab.active {
          background: linear-gradient(135deg, #2546fd, #473ddb);
          color: #fff;
          box-shadow: 0 4px 12px rgba(37,70,253,0.35);
        }
        .auth-tab:not(.active):hover {
          color: rgba(255,255,255,0.75);
          background: rgba(255,255,255,0.07);
        }

        /* Form fields */
        .auth-field {
          margin-bottom: 1rem;
        }
        .auth-field label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          margin-bottom: 0.4rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .auth-field input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #fff;
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          outline: none;
          margin-top: 0;
        }
        .auth-field input::placeholder { color: rgba(255,255,255,0.25); }
        .auth-field input:focus {
          border-color: #2546fd;
          background: rgba(37,70,253,0.08);
          box-shadow: 0 0 0 3px rgba(37,70,253,0.2);
        }

        /* Submit button */
        .auth-submit {
          width: 100%;
          padding: 0.85rem;
          background: linear-gradient(135deg, #2546fd 0%, #473ddb 100%);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.01em;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: all 0.2s ease;
          box-shadow: 0 6px 20px rgba(37,70,253,0.4);
          position: relative;
          overflow: hidden;
        }
        .auth-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          pointer-events: none;
        }
        .auth-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 28px rgba(37,70,253,0.5);
        }
        .auth-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        .auth-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Divider */
        .auth-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1.25rem 0;
          color: rgba(255,255,255,0.25);
          font-size: 0.8rem;
        }
        .auth-divider::before,
        .auth-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.1);
        }

        /* Google button */
        .auth-google {
          width: 100%;
          padding: 0.75rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          color: rgba(255,255,255,0.85);
          font-size: 0.9rem;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: all 0.2s ease;
        }
        .auth-google:hover:not(:disabled) {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }
        .auth-google:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Alerts */
        .auth-error {
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 10px;
          padding: 0.7rem 1rem;
          color: #fca5a5;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          animation: alertIn 0.2s ease;
        }
        .auth-success {
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.3);
          border-radius: 10px;
          padding: 0.7rem 1rem;
          color: #6ee7b7;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          animation: alertIn 0.2s ease;
        }
        @keyframes alertIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .auth-footer {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
        }

        /* Loading spinner */
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 6px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Floating particles */
        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: float linear infinite;
          opacity: 0;
        }
        @keyframes float {
          0%   { transform: translateY(100vh) scale(0); opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.3; }
          100% { transform: translateY(-20vh) scale(1.2); opacity: 0; }
        }
      `}</style>

      <div className="auth-root">
        {/* Decorative particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${4 + (i % 3) * 3}px`,
              height: `${4 + (i % 3) * 3}px`,
              left: `${10 + i * 11}%`,
              background: i % 2 === 0 ? '#2546fd' : '#8b5cf6',
              animationDuration: `${8 + i * 1.5}s`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}

        <div className="auth-card">
          {/* Logo */}
          <div className="auth-logo">
            <div className="auth-logo-icon">⚡</div>
            <h1>Gas Tracker</h1>
            <p>Real-time Web3 gas price dashboard</p>
          </div>

          {/* Tab switcher */}
          <div className="auth-tabs" role="tablist">
            <button
              id="tab-login"
              role="tab"
              aria-selected={mode === 'login'}
              className={`auth-tab${mode === 'login' ? ' active' : ''}`}
              onClick={() => switchMode('login')}
            >
              Sign In
            </button>
            <button
              id="tab-signup"
              role="tab"
              aria-selected={mode === 'signup'}
              className={`auth-tab${mode === 'signup' ? ' active' : ''}`}
              onClick={() => switchMode('signup')}
            >
              Create Account
            </button>
          </div>

          {/* Error / Success */}
          {error && (
            <div className="auth-error" role="alert">
              <span>⚠️</span> {error}
            </div>
          )}
          {success && (
            <div className="auth-success" role="status">
              <span>✅</span> {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="auth-email">Email address</label>
              <input
                id="auth-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="auth-password">Password</label>
              <input
                id="auth-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            </div>

            {mode === 'signup' && (
              <div className="auth-field">
                <label htmlFor="auth-confirm-password">Confirm password</label>
                <input
                  id="auth-confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>
            )}

            <button
              id="auth-submit-btn"
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading && <span className="spinner" />}
              {loading
                ? 'Please wait…'
                : mode === 'login'
                ? 'Sign In to Dashboard'
                : 'Create Account'}
            </button>
          </form>

          {/* OAuth divider */}
          <div className="auth-divider">or continue with</div>

          {/* Google OAuth */}
          <button
            id="auth-google-btn"
            className="auth-google"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="auth-footer">
            By continuing, you agree to our Terms of Service &amp; Privacy Policy
          </div>
        </div>
      </div>
    </>
  );
}
