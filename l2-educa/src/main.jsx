import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { registerServiceWorker } from './utils/registerSW';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register Service Worker for PWA capabilities
if (import.meta.env.PROD) {
  registerServiceWorker();
}

