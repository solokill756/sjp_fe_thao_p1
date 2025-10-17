import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

import Auth from '../pages/auth';
import App from '../App';

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
    ],
  },
]);

export default router;
