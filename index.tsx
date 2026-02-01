
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const init = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Elite Builders: Root element not found. Retrying in 100ms...");
    setTimeout(init, 100);
    return;
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Handle mounting safely
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
