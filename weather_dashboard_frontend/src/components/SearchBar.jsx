import React, { useEffect, useRef, useState, useMemo } from 'react';
import { theme } from '../styles/theme';

// PUBLIC_INTERFACE
export default function SearchBar({ value, onChange, onSearch }) {
  /** Search bar with debounced input and search button. */
  const [local, setLocal] = useState(value || '');
  const debounceRef = useRef(null);

  useEffect(() => setLocal(value || ''), [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocal(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange?.(val);
    }, 300);
  };

  const triggerSearch = (e) => {
    e?.preventDefault?.();
    onSearch?.(local);
  };

  const inputStyles = useMemo(() => ({
    flex: 1,
    minWidth: 0,
    border: `1px solid ${theme.colors.border}`,
    borderRight: 'none',
    padding: '12px 14px',
    borderTopLeftRadius: theme.radii.md,
    borderBottomLeftRadius: theme.radii.md,
    outline: 'none',
    transition: theme.transitions.base,
    boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.02)',
    color: theme.colors.text,
  }), []);

  const buttonStyles = useMemo(() => ({
    backgroundColor: theme.colors.primary,
    color: '#fff',
    border: `1px solid ${theme.colors.primary}`,
    padding: '12px 16px',
    borderTopRightRadius: theme.radii.md,
    borderBottomRightRadius: theme.radii.md,
    cursor: 'pointer',
    transition: theme.transitions.base,
    boxShadow: theme.shadows.sm,
  }), []);

  return (
    <form
      onSubmit={triggerSearch}
      role="search"
      aria-label="City search"
      style={{ width: '100%' }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'stretch',
          boxShadow: theme.shadows.sm,
          background: theme.colors.surface,
          borderRadius: theme.radii.md,
          overflow: 'hidden',
        }}
      >
        <label htmlFor="city-input" className="sr-only" style={{ position: 'absolute', left: -9999 }}>
          Enter a city name
        </label>
        <input
          id="city-input"
          name="city"
          type="text"
          value={local}
          onChange={handleChange}
          placeholder="Search city (e.g., San Francisco)"
          aria-label="City"
          style={inputStyles}
        />
        <button
          type="submit"
          onClick={triggerSearch}
          style={buttonStyles}
          onMouseOver={(e) => { e.currentTarget.style.opacity = '0.95'; e.currentTarget.style.boxShadow = theme.shadows.md; }}
          onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.boxShadow = theme.shadows.sm; }}
        >
          Search
        </button>
      </div>
    </form>
  );
}
