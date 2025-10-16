import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../app/store';

export default function Home() {
  const isAuthenticated = useSelector((state: RootState) => state.user.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth?mode=login');
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
      <p className="text-lg text-gray-700">
        This is the home page of your new React Router app.
      </p>
    </div>
  );
}
