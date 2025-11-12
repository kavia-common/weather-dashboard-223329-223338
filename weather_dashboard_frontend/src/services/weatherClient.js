const RAW_BASE_URL = process.env.REACT_APP_API_BASE;
const NODE_ENV = process.env.REACT_APP_NODE_ENV;
const FEATURE_FLAGS = process.env.REACT_APP_FEATURE_FLAGS;
const EXPERIMENTS = process.env.REACT_APP_EXPERIMENTS_ENABLED;
const ALLOW_MOCK_ON_ERROR = String(process.env.REACT_APP_ALLOW_MOCK_ON_ERROR || 'true') === 'true';

// Normalize base URL to avoid double slashes
const BASE_URL = RAW_BASE_URL ? String(RAW_BASE_URL).replace(/\/+$/, '') : '';

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

function buildUrl(path, query) {
  const url = new URL(`${BASE_URL}${path}`);
  if (query) url.searchParams.set('q', query);
  return url.toString();
}

// Internal helper
async function httpGet(path, query) {
  if (!BASE_URL) throw new Error('NO_BACKEND_CONFIGURED');
  const urlStr = buildUrl(path, query);
  let resp;
  try {
    resp = await fetch(urlStr, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      mode: 'cors',
    });
  } catch (networkErr) {
    // Likely network or CORS preflight failure
    const err = new Error('NETWORK_OR_CORS_ERROR');
    err.cause = networkErr;
    throw err;
  }
  if (!resp.ok) {
    const err = new Error('HTTP_ERROR');
    err.status = resp.status;
    throw err;
  }
  try {
    return await resp.json();
  } catch (parseErr) {
    const err = new Error('PARSE_ERROR');
    err.cause = parseErr;
    throw err;
  }
}

function makeHelpfulError(message, details = {}) {
  const e = new Error(message);
  Object.assign(e, { details });
  return e;
}

function mockCurrent(safeQuery) {
  const dt = new Date().toISOString();
  return { ...MOCK_CURRENT, city: safeQuery || MOCK_CURRENT.city, datetime: dt };
}

function mockForecast() {
  return MOCK_FORECAST.map((f) => ({ ...f }));
}

// PUBLIC_INTERFACE
export async function getCurrentWeather(query) {
  /** Get current weather by city; falls back to mock when API base is not set or unreachable (if allowed). */
  const safeQuery = (query || '').toString().trim();

  if (!BASE_URL) {
    return mockCurrent(safeQuery);
  }

  try {
    const data = await httpGet('/weather/current', safeQuery);
    return data;
  } catch (e) {
    // Provide actionable error messages and optional mock fallback
    if (e?.message === 'NETWORK_OR_CORS_ERROR') {
      if (ALLOW_MOCK_ON_ERROR) return mockCurrent(safeQuery);
      throw makeHelpfulError(
        'Unable to reach the weather service. Check that the backend is running and CORS allows this origin.',
        {
          apiBase: BASE_URL,
          hint: 'Ensure Access-Control-Allow-Origin includes your frontend URL.',
          code: 'NETWORK_OR_CORS',
        }
      );
    }
    if (e?.message === 'HTTP_ERROR') {
      if (ALLOW_MOCK_ON_ERROR) return mockCurrent(safeQuery);
      throw makeHelpfulError(
        `Weather service returned an error.`,
        { apiBase: BASE_URL, status: e.status, code: 'HTTP_ERROR' }
      );
    }
    if (ALLOW_MOCK_ON_ERROR) return mockCurrent(safeQuery);
    throw makeHelpfulError('Unable to fetch current weather at this time.', { code: 'GENERIC' });
  }
}

// PUBLIC_INTERFACE
export async function getForecast(query) {
  /** Get 5-day forecast by city; falls back to mock when API base is not set or unreachable (if allowed). */
  const safeQuery = (query || '').toString().trim();

  if (!BASE_URL) {
    return mockForecast();
  }

  try {
    const data = await httpGet('/weather/forecast', safeQuery);
    return data;
  } catch (e) {
    if (e?.message === 'NETWORK_OR_CORS_ERROR') {
      if (ALLOW_MOCK_ON_ERROR) return mockForecast();
      throw makeHelpfulError(
        'Unable to reach the weather service. Check that the backend is running and CORS allows this origin.',
        {
          apiBase: BASE_URL,
          hint: 'Ensure Access-Control-Allow-Origin includes your frontend URL.',
          code: 'NETWORK_OR_CORS',
        }
      );
    }
    if (e?.message === 'HTTP_ERROR') {
      if (ALLOW_MOCK_ON_ERROR) return mockForecast();
      throw makeHelpfulError(
        `Weather service returned an error.`,
        { apiBase: BASE_URL, status: e.status, code: 'HTTP_ERROR' }
      );
    }
    if (ALLOW_MOCK_ON_ERROR) return mockForecast();
    throw makeHelpfulError('Unable to fetch forecast at this time.', { code: 'GENERIC' });
  }
}

// PUBLIC_INTERFACE
export function getClientMeta() {
  /** Expose environment-related metadata for debugging toggles if needed. */
  return {
    hasBackend: Boolean(BASE_URL),
    apiBase: BASE_URL || '',
    env: NODE_ENV,
    featureFlags: FEATURE_FLAGS,
    experiments: EXPERIMENTS,
    allowMockOnError: ALLOW_MOCK_ON_ERROR,
  };
}
