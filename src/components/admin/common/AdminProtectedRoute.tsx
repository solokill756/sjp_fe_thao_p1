import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { Navigate, Outlet } from 'react-router';

const AdminProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isAdmin = useSelector(
    (state: RootState) => state.auth.user?.role === 'admin'
  );

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
