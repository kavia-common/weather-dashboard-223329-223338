# Weather Dashboard Frontend (React)

A responsive, modern Weather Dashboard built with React. It features an accessible UI, Ocean Professional theme, search with debounce, current weather card, and 5-day forecast panel.

## Features

- Ocean Professional theme (primary #2563EB, amber accents, error #EF4444)
- Responsive layout: header, search bar, current weather card, forecast panel
- Loading and error states with aria-live for accessibility
- Input sanitization and centralized error handling
- Mock data fallback when no backend is configured
- Preparation for backend integration using REACT_APP_API_BASE

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
- REACT_APP_NODE_ENV: Node environment label for footer display.
- REACT_APP_PORT: If used by tooling (Create React App defaults to 3000).
- REACT_APP_FEATURE_FLAGS: String/JSON flags for future use.
- REACT_APP_EXPERIMENTS_ENABLED: Enable experimental toggles in future.

Note: Do not commit secrets to the repository. Provide variables through your environment or .env (not included here). You may create a local .env with the above keys if needed.

## Mock Fallback

When REACT_APP_API_BASE is not set, weatherClient.js returns mocked data:
- Current weather sample: San Francisco, temp 18°C, feelsLike 17°C, humidity 72%, wind 14 km/h, visibility 10 km
- Forecast: 5 items with day label, min/max, and icon

This enables full UI functionality without any backend.

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

## Backend Integration (Future)

weatherClient.js reads REACT_APP_API_BASE and exposes:
- getCurrentWeather(query)
- getForecast(query)

If you provision a backend:
- Implement endpoints /weather/current?q=City and /weather/forecast?q=City
- Ensure CORS is configured for the frontend origin

## Notes

- No secrets are hardcoded; configuration is handled via environment variables.
- Tests are not required for this task, but code is structured to be unit-test friendly.
