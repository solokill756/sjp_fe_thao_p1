import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

import App from '../App';
import Profile from '../pages/Profile';
import Shop from '../pages/shop';
import ProductDetail from '../pages/productDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderDetail from '../pages/OrderDetail';
import OrderHistory from '../pages/OrderHistory';
import Auth from '../pages/auth';

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
      {
        path: 'order-history',
        element: <OrderHistory />,
      },
      {
        path: 'order-history/:orderId',
        element: <OrderDetail />,
      },
    ],
  },
]);

export default router;
