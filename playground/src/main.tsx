import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './router';
import './main.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element for the playground.');
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
