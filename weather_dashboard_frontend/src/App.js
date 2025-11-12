import React, { useEffect, useState } from 'react';
import './App.css';
import { applyThemeRootVars, theme } from './styles/theme';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import ForecastList from './components/ForecastList';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import { useWeather } from './hooks/useWeather';

// PUBLIC_INTERFACE
function App() {
  /** Weather Dashboard single-page app. */
  const [mode, setMode] = useState('light');
  const { query, setQuery, loading, error, current, forecast, fetchWeather } = useWeather('');

  useEffect(() => {
    applyThemeRootVars();
    document.body.style.background = theme.colors.background;
  }, []);

  const toggleTheme = () => {
    setMode((m) => (m === 'light' ? 'dark' : 'light'));
    // Optional: could expand to set dark variables; keeping simple per requirements
  };

  const handleSearch = (q) => {
    fetchWeather(q);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(180deg, ${theme.colors.background}, #ffffff)`,
      color: theme.colors.text,
      transition: theme.transitions.slow
    }}>
      <Header title="Weather Dashboard" onToggleTheme={toggleTheme} themeMode={mode} />
      <main
        role="main"
        style={{
          maxWidth: theme.layout.maxWidth,
          padding: theme.layout.containerPadding,
          margin: '0 auto',
          display: 'grid',
          gap: 16,
        }}
      >
        <section aria-label="Search" style={{ width: '100%' }}>
          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
          />
        </section>

        {!current && !loading && !error ? (
          <div
            role="status"
            aria-live="polite"
            style={{
              padding: 18,
              background: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radii.lg,
              color: theme.colors.mutedText,
              boxShadow: theme.shadows.sm,
            }}
          >
            Start by searching for a city to view its current weather and 5-day forecast.
          </div>
        ) : null}

        {loading ? <LoadingState /> : null}
        {error ? <ErrorState message={error} /> : null}

        {current ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: 16,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <CurrentWeatherCard data={current} />
            </div>
            <div style={{
              background: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radii.lg,
              boxShadow: theme.shadows.md,
              padding: 16,
              display: 'grid',
              alignContent: 'start',
              gap: 12,
              minHeight: 100,
            }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Highlights</h2>
              <div style={{ color: theme.colors.mutedText, fontSize: 14 }}>
                City insights, advisories, or additional metrics can appear here in the future.
              </div>
            </div>
          </div>
        ) : null}

        {forecast?.length ? (
          <ForecastList items={forecast} />
        ) : null}

      </main>
      <footer
        role="contentinfo"
        style={{
          padding: '16px',
          textAlign: 'center',
          color: theme.colors.mutedText,
          borderTop: `1px solid ${theme.colors.border}`,
          background: theme.colors.surface
        }}
      >
        <small>Environment: {process.env.REACT_APP_NODE_ENV || 'development'} • Mock data {process.env.REACT_APP_API_BASE ? 'disabled' : 'enabled'}</small>
      </footer>
    </div>
  );
}

export default App;
