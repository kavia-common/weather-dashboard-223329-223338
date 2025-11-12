import React from 'react';
import { theme } from '../styles/theme';

// PUBLIC_INTERFACE
export default function ErrorState({ message = 'Something went wrong. Please try again.' }) {
  /** Accessible error banner. */
  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        padding: 14,
        background: '#FEE2E2',
        border: `1px solid ${theme.colors.error}`,
        color: '#991B1B',
        borderRadius: theme.radii.md,
        boxShadow: theme.shadows.sm,
      }}
    >
      <span aria-hidden style={{ marginRight: 8 }}>⚠️</span>
      {message}
    </div>
  );
}
