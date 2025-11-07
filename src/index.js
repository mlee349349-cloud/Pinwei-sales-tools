// Import gesture handler first (required for React Navigation)
import 'react-native-gesture-handler';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

// Ensure root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = 'padding: 20px; color: red; font-family: Arial;';
  errorDiv.textContent = 'Error: Root element not found. Make sure public/index.html has <div id="root"></div>';
  document.body.appendChild(errorDiv);
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Error rendering app:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: Arial;">
        <h2>Error Loading App</h2>
        <p>${error.message}</p>
        <pre style="background: #f0f0f0; padding: 10px; overflow: auto;">${error.stack}</pre>
      </div>
    `;
  }
}
