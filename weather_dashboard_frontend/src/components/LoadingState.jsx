import React from 'react';
import { theme } from '../styles/theme';

// PUBLIC_INTERFACE
export default function LoadingState({ message = 'Loading weather…' }) {
  /** Accessible loading region with subtle animation. */
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      style={{
        padding: 16,
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radii.md,
        boxShadow: theme.shadows.sm,
        color: theme.colors.mutedText,
      }}
    >
      <span aria-hidden style={{ marginRight: 8, animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
      {message}
      <style>
        {`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}
      </style>
    </div>
  );
}
