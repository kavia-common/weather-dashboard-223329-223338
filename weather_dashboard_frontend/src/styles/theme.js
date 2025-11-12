export const theme = {
  // Ocean Professional theme palette and tokens
  colors: {
    primary: '#2563EB', // blue
    secondary: '#F59E0B', // amber (also success accent)
    success: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    mutedText: '#6B7280',
    border: '#E5E7EB'
  },
  radii: {
    md: '12px',
    sm: '8px',
    lg: '16px',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.06)',
    md: '0 4px 12px rgba(0,0,0,0.08)',
    lg: '0 10px 25px rgba(0,0,0,0.10)'
  },
  transitions: {
    base: 'all 200ms ease',
    slow: 'all 300ms ease'
  },
  layout: {
    maxWidth: '1200px',
    containerPadding: '16px'
  },
};

// PUBLIC_INTERFACE
export function applyThemeRootVars(doc = document) {
  /** Apply CSS variables to :root for simple styling without external libs. */
  const { colors } = theme;
  const root = doc.documentElement;
  root.style.setProperty('--color-primary', colors.primary);
  root.style.setProperty('--color-secondary', colors.secondary);
  root.style.setProperty('--color-error', colors.error);
  root.style.setProperty('--bg', colors.background);
  root.style.setProperty('--surface', colors.surface);
  root.style.setProperty('--text', colors.text);
  root.style.setProperty('--text-muted', colors.mutedText);
  root.style.setProperty('--border', colors.border);
}
