import React from 'react';
import { theme } from '../styles/theme';

// PUBLIC_INTERFACE
export default function Header({ title = 'Weather Dashboard', onToggleTheme, themeMode = 'light' }) {
  /** Top header with title and theme toggle. */
  return (
    <header
      style={{
        background: `linear-gradient(135deg, ${theme.colors.background}, #ffffff)`,
        borderBottom: `1px solid ${theme.colors.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
      role="banner"
    >
      <div
        style={{
          maxWidth: theme.layout.maxWidth,
          margin: '0 auto',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span
            aria-hidden
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: theme.colors.primary,
              boxShadow: `0 0 0 6px ${theme.colors.primary}22`,
              display: 'inline-block',
            }}
          />
          <h1
            style={{
              margin: 0,
              fontSize: '20px',
              color: theme.colors.text,
              letterSpacing: 0.2,
            }}
          >
            {title}
          </h1>
        </div>
        <div>
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
            style={{
              border: `1px solid ${theme.colors.border}`,
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
              borderRadius: '10px',
              padding: '8px 12px',
              cursor: 'pointer',
              transition: theme.transitions.base,
              boxShadow: theme.shadows.sm,
            }}
            onMouseOver={(e) => (e.currentTarget.style.boxShadow = theme.shadows.md)}
            onMouseOut={(e) => (e.currentTarget.style.boxShadow = theme.shadows.sm)}
          >
            {themeMode === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </header>
  );
}
