import React from 'react';
import { theme } from '../styles/theme';
import { formatDayName, formatTemperatureC } from '../utils/format';

// PUBLIC_INTERFACE
export default function ForecastItem({ item }) {
  /** One forecast cell with day, icon, min/max. */
  const day = formatDayName(item?.date);
  return (
    <div
      tabIndex={0}
      role="group"
      aria-label={`${day} forecast`}
      style={{
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radii.md,
        padding: 12,
        minWidth: 140,
        transition: theme.transitions.base,
        boxShadow: theme.shadows.sm,
        outline: 'none',
      }}
      onMouseOver={(e) => (e.currentTarget.style.boxShadow = theme.shadows.md)}
      onMouseOut={(e) => (e.currentTarget.style.boxShadow = theme.shadows.sm)}
      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.colors.primary}44`)}
      onBlur={(e) => (e.currentTarget.style.boxShadow = theme.shadows.sm)}
    >
      <div style={{ fontWeight: 600, color: theme.colors.text, marginBottom: 8 }}>{day}</div>
      <div style={{ fontSize: 28 }} aria-hidden>
        {iconFor(item?.icon)}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginTop: 6 }}>
        <span style={{ color: theme.colors.text, fontWeight: 600 }}>{formatTemperatureC(item?.max)}</span>
        <span style={{ color: theme.colors.mutedText }}>{formatTemperatureC(item?.min)}</span>
      </div>
      {item?.short ? (
        <div style={{ marginTop: 6, color: theme.colors.mutedText, fontSize: 12 }}>
          {item.short}
        </div>
      ) : null}
    </div>
  );
}

function iconFor(code) {
  switch (code) {
    case 'cloud-sun': return '⛅';
    case 'sun': return '☀️';
    case 'cloud': return '☁️';
    case 'rain': return '🌧️';
    case 'storm': return '⛈️';
    case 'snow': return '❄️';
    default: return '🌡️';
  }
}
