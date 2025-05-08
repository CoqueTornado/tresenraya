import React from 'react';
import App from './App'; // Changed from Game to App
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
