const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// PUBLIC_INTERFACE
export function formatTemperatureC(value) {
  /** Format temperature in Celsius with degree symbol. */
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '—';
  return `${Math.round(Number(value))}°C`;
}

// PUBLIC_INTERFACE
export function formatKph(value) {
  /** Format speed in kilometers per hour. */
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '—';
  return `${Math.round(Number(value))} km/h`;
}

// PUBLIC_INTERFACE
export function formatHumidity(value) {
  /** Format humidity as percentage. */
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '—';
  return `${Math.round(Number(value))}%`;
}

// PUBLIC_INTERFACE
export function formatVisibilityKm(value) {
  /** Format visibility in km. */
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '—';
  return `${Math.round(Number(value))} km`;
}

// PUBLIC_INTERFACE
export function formatDayName(dateLike) {
  /** Get day name from date-like input. */
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return '';
  return DAY_NAMES[d.getDay()];
}

// PUBLIC_INTERFACE
export function formatDateTimeReadable(dateLike) {
  /** Human-readable date time string. */
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// PUBLIC_INTERFACE
export function sanitizeQuery(input) {
  /** Sanitize city input: trim, collapse spaces, remove control chars, restrict length. */
  if (typeof input !== 'string') return '';
  const trimmed = input.trim().replace(/\s+/g, ' ').replace(/[^\P{C}]/gu, '');
  return trimmed.slice(0, 80);
}
