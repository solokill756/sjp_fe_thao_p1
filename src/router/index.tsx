import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

import Auth from '../pages/auth';
import App from '../App';
import Profile from '../pages/Profile';
import Shop from '../pages/shop';
import ProductDetail from '../pages/productDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'auth',
        element: <Auth />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'product/:id',
        element: <ProductDetail />,
      },
    ],
  },
]);

export default router;
