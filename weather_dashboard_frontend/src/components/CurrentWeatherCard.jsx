import React, { useEffect, useState } from 'react';
import { theme } from '../styles/theme';
import { formatDateTimeReadable, formatHumidity, formatKph, formatTemperatureC, formatVisibilityKm } from '../utils/format';

// PUBLIC_INTERFACE
export default function CurrentWeatherCard({ data }) {
  /** Card showing current weather details. */
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 20); return () => clearTimeout(t); }, [data]);

  if (!data) return null;

  const {
    city, country, datetime, temp, feelsLike, humidity, windKph, visibilityKm, condition,
  } = data;

  return (
    <section
      aria-label="Current weather"
      style={{
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radii.lg,
        boxShadow: theme.shadows.md,
        padding: 20,
        width: '100%',
        opacity: mounted ? 1 : 0,
        transform: `translateY(${mounted ? 0 : 8}px)`,
        transition: theme.transitions.slow,
      }}
    >
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', minWidth: 220 }}>
          <div
            aria-hidden
            style={{
              width: 56,
              height: 56,
              borderRadius: theme.radii.full,
              background: `radial-gradient(circle at 40% 30%, ${theme.colors.primary}22, #e6f0ff)`,
              display: 'grid',
              placeItems: 'center',
              color: theme.colors.primary,
              boxShadow: theme.shadows.sm,
              fontSize: 24,
            }}
            title={condition?.label || 'Weather'}
          >
            {iconFor(condition?.icon)}
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: theme.colors.text }}>
              {city}{country ? `, ${country}` : ''}
            </div>
            <div style={{ fontSize: 13, color: theme.colors.mutedText }}>
              {formatDateTimeReadable(datetime)}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <div style={{ fontSize: 40, fontWeight: 700, color: theme.colors.text }}>
            {formatTemperatureC(temp)}
          </div>
          <div style={{
            fontSize: 14,
            color: theme.colors.secondary,
            fontWeight: 600,
          }}>
            {condition?.label || ''}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 12,
          marginTop: 16,
        }}
      >
        <Metric label="Feels like" value={formatTemperatureC(feelsLike)} />
        <Metric label="Humidity" value={formatHumidity(humidity)} />
        <Metric label="Wind" value={formatKph(windKph)} />
        <Metric label="Visibility" value={formatVisibilityKm(visibilityKm)} />
      </div>
    </section>
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

function Metric({ label, value }) {
  return (
    <div
      style={{
        padding: '12px 14px',
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radii.md,
        background: '#fafafa',
      }}
    >
      <div style={{ fontSize: 12, color: theme.colors.mutedText }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: theme.colors.text }}>{value}</div>
    </div>
  );
}
