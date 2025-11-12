import { useCallback, useMemo, useRef, useState } from 'react';
import { getCurrentWeather, getForecast, getClientMeta } from '../services/weatherClient';
import { sanitizeQuery } from '../utils/format';

function isValidQuery(q) {
  return typeof q === 'string' && sanitizeQuery(q).length >= 2;
}

// PUBLIC_INTERFACE
export function useWeather(initialQuery = '') {
  /** Manage weather data state: query, loading, error, data, and fetchWeather(). */
  const [query, setQuery] = useState(sanitizeQuery(initialQuery));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [diagnostic, setDiagnostic] = useState(null);
  const abortRef = useRef({ aborted: false });

  const setSafeQuery = useCallback((val) => {
    setQuery(sanitizeQuery(val));
  }, []);

  const fetchWeather = useCallback(async (q) => {
    const effective = sanitizeQuery(q ?? query);
    if (!isValidQuery(effective)) {
      setError('Please enter at least 2 characters for the city name.');
      return;
    }
    setLoading(true);
    setError('');
    setDiagnostic(null);
    abortRef.current.aborted = false;
    try {
      const [c, f] = await Promise.all([
        getCurrentWeather(effective),
        getForecast(effective),
      ]);
      if (abortRef.current.aborted) return;
      setCurrent(c);
      setForecast(Array.isArray(f) ? f : []);
    } catch (e) {
      // User-friendly error with diagnostics when available (no sensitive details)
      const meta = getClientMeta();
      const details = e?.details || {};
      const msg = e?.message || 'Unable to load weather. Please try again.';
      setError(msg);
      setDiagnostic({
        apiBase: meta.apiBase || null,
        code: details.code || null,
        status: details.status || null,
        hint: details.hint || null,
      });
      setCurrent(null);
      setForecast([]);
    } finally {
      if (!abortRef.current.aborted) setLoading(false);
    }
  }, [query]);

  const reset = useCallback(() => {
    setCurrent(null);
    setForecast([]);
    setError('');
    setDiagnostic(null);
  }, []);

  const state = useMemo(() => ({
    query, setQuery: setSafeQuery, loading, error, current, forecast, fetchWeather, reset, diagnostic,
  }), [query, setSafeQuery, loading, error, current, forecast, fetchWeather, reset, diagnostic]);

  return state;
}
