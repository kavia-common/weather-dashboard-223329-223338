# Weather Dashboard Frontend (React)

A responsive, modern Weather Dashboard built with React. It features an accessible UI, Ocean Professional theme, search with debounce, current weather card, and 5-day forecast panel.

## Features

- Ocean Professional theme (primary #2563EB, amber accents, error #EF4444)
- Responsive layout: header, search bar, current weather card, forecast panel
- Loading and error states with aria-live for accessibility
- Input sanitization and centralized error handling
- Mock data fallback when no backend is configured
- Backend integration via REACT_APP_API_BASE with graceful fallback and helpful diagnostics

## Getting Started

1) Install dependencies
   npm install

2) Run development server
   npm start
   Open http://localhost:3000

3) Build for production
   npm run build

## Environment Variables

These variables are read from the environment if present:

- REACT_APP_API_BASE: Base URL for backend API (e.g., https://api.example.com). If unset, the app uses mocked data and remains fully functional.
- REACT_APP_ALLOW_MOCK_ON_ERROR: When true (default), if the configured API is unreachable or CORS-blocked, the app will gracefully fall back to mock data and show a diagnostic note. Set to false to disable mock fallback on errors.
- REACT_APP_NODE_ENV: Node environment label for footer display.
- REACT_APP_PORT: If used by tooling (Create React App defaults to 3000).
- REACT_APP_FEATURE_FLAGS: String/JSON flags for future use.
- REACT_APP_EXPERIMENTS_ENABLED: Enable experimental toggles in future.

Note: Do not commit secrets to the repository. Provide variables through your environment or .env (not included here). You may create a local .env with the above keys if needed.

## Mock Fallback

When REACT_APP_API_BASE is not set, weatherClient.js returns mocked data:
- Current weather sample: San Francisco, temp 18°C, feelsLike 17°C, humidity 72%, wind 14 km/h, visibility 10 km
- Forecast: 5 items with day label, min/max, and icon

If REACT_APP_API_BASE is set but the API is unreachable or CORS fails, the app will:
- By default (REACT_APP_ALLOW_MOCK_ON_ERROR=true), fall back to mock data and display a diagnostic banner with hints.
- If REACT_APP_ALLOW_MOCK_ON_ERROR=false, show a helpful error instructing to check backend reachability and CORS.

## CORS and Backend Configuration

Ensure your backend allows the frontend origin. Typical CORS headers required:
- Access-Control-Allow-Origin: https://your-frontend-host:3000
- Access-Control-Allow-Methods: GET, OPTIONS
- Access-Control-Allow-Headers: Content-Type

Endpoints expected:
- GET {REACT_APP_API_BASE}/weather/current?q=City
- GET {REACT_APP_API_BASE}/weather/forecast?q=City

## Project Structure

src/
- App.js (dashboard layout and integration)
- components/
  - Header.jsx
  - SearchBar.jsx
  - CurrentWeatherCard.jsx
  - ForecastList.jsx
  - ForecastItem.jsx
  - LoadingState.jsx
  - ErrorState.jsx
  - DebugBanner.jsx
- hooks/
  - useWeather.js
- services/
  - weatherClient.js
- styles/
  - theme.js
- utils/
  - format.js
- index.js / index.css / App.css

## Accessibility

- Search form and inputs include accessible labels
- Loading and error states use aria-live regions
- Keyboard focus and hover states are visible
- Semantic regions: role="banner", role="main", role="contentinfo"

## Theming

Theme tokens are defined in src/styles/theme.js and applied via inline styles and root CSS variables. The design follows a modern aesthetic with subtle shadows, rounded corners (12px), and smooth transitions.

## Notes

- No secrets are hardcoded; configuration is handled via environment variables.
- Tests are not required for this task, but code is structured to be unit-test friendly.
