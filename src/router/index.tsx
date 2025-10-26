import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

import Auth from '../pages/auth';
import App from '../App';
import Profile from '../pages/Profile';
import Shop from '../pages/shop';
import ProductDetail from '../pages/productDetail';
import Cart from '../pages/cart';
import Checkout from '../pages/checkout';

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
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'products/:categoryId',
        element: <Shop />,
      },
      {
        path: 'products/:tag',
        element: <Shop />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
    ],
  },
]);

export default router;
