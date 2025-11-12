import React from 'react';
import { theme } from '../styles/theme';

/**
 * PUBLIC_INTERFACE
 * DebugBanner
 * Lightweight banner to show API base, mock status, and diagnostic hints.
 */
export default function DebugBanner({ visible = true, apiBase, mockEnabled, diagnostic }) {
  /** Display environment and connectivity info when debugging issues. */
  if (!visible) return null;
  const hasDiag = Boolean(diagnostic && (diagnostic.code || diagnostic.hint || diagnostic.status));
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        padding: 10,
        marginTop: 4,
        background: '#F3F4F6',
        border: `1px dashed ${theme.colors.border}`,
        borderRadius: theme.radii.md,
        color: theme.colors.mutedText,
        fontSize: 12,
      }}
    >
      <div>
        Backend: {apiBase ? apiBase : 'none (mock)'} • Mock fallback: {mockEnabled ? 'enabled' : 'disabled'}
      </div>
      {hasDiag ? (
        <div style={{ marginTop: 6 }}>
          <strong>Note:</strong>{' '}
          {diagnostic.hint
            ? diagnostic.hint
            : 'If the backend is set, ensure it is reachable and CORS allows this origin.'}
          {diagnostic.status ? ` (status: ${diagnostic.status})` : null}
          {diagnostic.code ? ` [${diagnostic.code}]` : null}
        </div>
      ) : null}
    </div>
  );
}
