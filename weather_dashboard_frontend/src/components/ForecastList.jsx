import React from 'react';
import { theme } from '../styles/theme';
import ForecastItem from './ForecastItem';

// PUBLIC_INTERFACE
export default function ForecastList({ items = [] }) {
  /** List of forecast items; responsive row scroll on mobile, grid on desktop. */
  if (!items?.length) return null;

  return (
    <section aria-label="5-day forecast" style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', color: theme.colors.text }}>Next 5 Days</h2>
        <span style={{ fontSize: '12px', color: theme.colors.mutedText }}>Scroll for more</span>
      </div>
      <div
        style={{
          display: 'grid',
          gap: '12px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        }}
      >
        {items.map((it, idx) => <ForecastItem key={`${it?.date || idx}`} item={it} />)}
      </div>
      <div
        style={{
          marginTop: '10px',
          overflowX: 'auto',
          display: 'none',
          gap: '12px',
        }}
        className="forecast-scroll"
      >
        {items.map((it, idx) => (
          <div key={`scroll-${it?.date || idx}`} style={{ minWidth: '160px' }}>
            <ForecastItem item={it} />
          </div>
        ))}
      </div>
      <style>
        {`
          @media (max-width: 640px) {
            section[aria-label="5-day forecast"] > div:nth-of-type(2) { display: none; }
            section[aria-label="5-day forecast"] > .forecast-scroll { display: flex; }
          }
        `}
      </style>
    </section>
  );
}
