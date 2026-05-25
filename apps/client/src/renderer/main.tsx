import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { initClient } from './client/index.ts';
import './index.css';

// Wire up the mock backend. In the future (task #4+) a real IPC-backed
// client will be selected here based on environment.
initClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
