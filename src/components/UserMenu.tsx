'use client';

import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();

  if (!user) return null;

  const email = user.email ?? '';
  const initials = email.slice(0, 2).toUpperCase();

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    router.push('/auth');
    router.refresh();
  };

  return (
    <>
      <style>{`
        .user-menu-wrapper {
          position: relative;
          display: inline-block;
        }

        .user-avatar-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, rgba(37,70,253,0.15), rgba(139,92,246,0.15));
          border: 1px solid rgba(37,70,253,0.3);
          border-radius: 40px;
          padding: 0.3rem 0.75rem 0.3rem 0.3rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }
        .user-avatar-btn:hover {
          background: linear-gradient(135deg, rgba(37,70,253,0.25), rgba(139,92,246,0.25));
          border-color: rgba(37,70,253,0.5);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37,70,253,0.2);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2546fd, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }

        .user-email-text {
          font-size: 0.82rem;
          font-weight: 600;
          color: #1e3a8a;
          max-width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .user-chevron {
          font-size: 0.6rem;
          color: #6b7280;
          transition: transform 0.2s;
          margin-left: 2px;
        }
        .user-chevron.open { transform: rotate(180deg); }

        .user-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 220px;
          background: #fff;
          border: 1px solid rgba(37,70,253,0.12);
          border-radius: 14px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(37,70,253,0.08);
          overflow: hidden;
          z-index: 1000;
          animation: dropIn 0.18s cubic-bezier(0.34,1.3,0.64,1) both;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .user-dropdown-header {
          padding: 0.9rem 1rem;
          background: linear-gradient(135deg, #f0f4ff, #f8f0ff);
          border-bottom: 1px solid rgba(37,70,253,0.08);
        }
        .user-dropdown-header .label {
          font-size: 0.7rem;
          color: #9ca3af;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .user-dropdown-header .email-full {
          font-size: 0.88rem;
          font-weight: 600;
          color: #1d3b62;
          margin-top: 2px;
          word-break: break-all;
        }

        .user-signout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.8rem 1rem;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 0.88rem;
          font-weight: 600;
          color: #ef4444;
          font-family: inherit;
          transition: background 0.15s;
          text-align: left;
        }
        .user-signout-btn:hover:not(:disabled) {
          background: #fef2f2;
        }
        .user-signout-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .signout-spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(239,68,68,0.3);
          border-top-color: #ef4444;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 999;
        }
      `}</style>

      <div className="user-menu-wrapper">
        {open && (
          <div
            className="menu-overlay"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}

        <button
          id="user-menu-trigger"
          className="user-avatar-btn"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="User menu"
        >
          <div className="user-avatar">{initials}</div>
          <span className="user-email-text">{email}</span>
          <span className={`user-chevron${open ? ' open' : ''}`}>▼</span>
        </button>

        {open && (
          <div className="user-dropdown" role="menu">
            <div className="user-dropdown-header">
              <div className="label">Signed in as</div>
              <div className="email-full">{email}</div>
            </div>

            <button
              id="user-signout-btn"
              className="user-signout-btn"
              onClick={handleSignOut}
              disabled={signingOut}
              role="menuitem"
            >
              {signingOut ? (
                <span className="signout-spinner" />
              ) : (
                <span>🚪</span>
              )}
              {signingOut ? 'Signing out…' : 'Sign Out'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
