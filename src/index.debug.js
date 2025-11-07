// Debug version - will show errors in console
import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('Starting app...');

try {
  const App = require('./App').default;
  
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element not found!');
    document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Root element not found</div>';
  } else {
    console.log('Root element found, rendering app...');
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      React.createElement(React.StrictMode, null,
        React.createElement(App)
      )
    );
    console.log('App rendered successfully');
  }
} catch (error) {
  console.error('Error loading app:', error);
  document.body.innerHTML = `<div style="padding: 20px; color: red;">
    <h1>Error Loading App</h1>
    <pre>${error.toString()}</pre>
    <pre>${error.stack}</pre>
  </div>`;
}

