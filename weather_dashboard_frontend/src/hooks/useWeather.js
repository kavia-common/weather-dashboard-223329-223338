import { useCallback, useMemo, useRef, useState } from 'react';
import { getCurrentWeather, getForecast } from '../services/weatherClient';
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
      // Centralized error message. Hide sensitive details.
      setError(e?.message || 'Unable to load weather. Please try again.');
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
  }, []);

  const state = useMemo(() => ({
    query, setQuery: setSafeQuery, loading, error, current, forecast, fetchWeather, reset,
  }), [query, setSafeQuery, loading, error, current, forecast, fetchWeather, reset]);

  return state;
}
