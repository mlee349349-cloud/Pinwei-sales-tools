// Test version - minimal setup
import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('Test index.js loaded');

// Try to import the test app
let App;
try {
  App = require('./App.test-simple').default;
  console.log('Test app imported successfully');
} catch (error) {
  console.error('Error importing test app:', error);
  document.getElementById('root').innerHTML = `
    <div style="padding: 20px; color: red;">
      <h2>Import Error</h2>
      <pre>${error.toString()}</pre>
    </div>
  `;
  throw error;
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
} else {
  console.log('Root element found, rendering...');
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(React.createElement(App));
    console.log('Test app rendered successfully');
  } catch (error) {
    console.error('Render error:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red;">
        <h2>Render Error</h2>
        <pre>${error.toString()}</pre>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
}


