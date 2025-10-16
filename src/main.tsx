import { createRoot } from 'react-dom/client';
import './styles/global.css';
import './i18n';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Toaster } from 'react-hot-toast';
import { store } from './app/store';
import { Provider } from 'react-redux';
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
