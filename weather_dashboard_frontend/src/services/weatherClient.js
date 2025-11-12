const BASE_URL = process.env.REACT_APP_API_BASE;
const NODE_ENV = process.env.REACT_APP_NODE_ENV;
const FEATURE_FLAGS = process.env.REACT_APP_FEATURE_FLAGS;
const EXPERIMENTS = process.env.REACT_APP_EXPERIMENTS_ENABLED;

const MOCK_CURRENT = {
  city: 'San Francisco',
  country: 'US',
  datetime: new Date().toISOString(),
  temp: 18,
  feelsLike: 17,
  humidity: 72,
  windKph: 14,
  visibilityKm: 10,
  condition: { code: 'partly-cloudy', label: 'Partly Cloudy', icon: 'cloud-sun' },
};

const MOCK_FORECAST = Array.from({ length: 5 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i + 1);
  const base = 14 + i;
  return {
    date: d.toISOString(),
    min: base - 3,
    max: base + 3,
    icon: 'cloud-sun',
    short: ['Clear', 'Partly Cloudy', 'Rain', 'Windy', 'Foggy'][i % 5],
  };
});

// Internal helper
async function httpGet(path, query) {
  const url = new URL(`${BASE_URL}${path}`);
  if (query) url.searchParams.set('q', query);
  const resp = await fetch(url.toString(), {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  });
  if (!resp.ok) {
    const msg = `Weather API error: ${resp.status}`;
    throw new Error(msg);
  }
  return resp.json();
}

// PUBLIC_INTERFACE
export async function getCurrentWeather(query) {
  /** Get current weather by city; falls back to mock when API base is not set. */
  const safeQuery = (query || '').toString().trim();
  if (!BASE_URL) {
    // Mock path
    const dt = new Date().toISOString();
    return { ...MOCK_CURRENT, city: safeQuery || MOCK_CURRENT.city, datetime: dt };
  }
  // Real path
  try {
    const data = await httpGet('/weather/current', safeQuery);
    return data;
  } catch (e) {
    // Do not log sensitive data; return masked message upstream
    throw new Error('Unable to fetch current weather at this time.');
  }
}

// PUBLIC_INTERFACE
export async function getForecast(query) {
  /** Get 5-day forecast by city; falls back to mock when API base is not set. */
  const safeQuery = (query || '').toString().trim();
  if (!BASE_URL) {
    return MOCK_FORECAST.map((f) => ({ ...f }));
  }
  try {
    const data = await httpGet('/weather/forecast', safeQuery);
    return data;
  } catch (e) {
    throw new Error('Unable to fetch forecast at this time.');
  }
}

// PUBLIC_INTERFACE
export function getClientMeta() {
  /** Expose environment-related metadata for debugging toggles if needed. */
  return {
    hasBackend: Boolean(BASE_URL),
    env: NODE_ENV,
    featureFlags: FEATURE_FLAGS,
    experiments: EXPERIMENTS,
  };
}
