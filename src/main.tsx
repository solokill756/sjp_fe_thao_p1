import { createRoot } from 'react-dom/client';
import './styles/global.css';
import './i18n';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Toaster } from 'react-hot-toast';
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <RouterProvider router={router} />
  </React.StrictMode>
);
