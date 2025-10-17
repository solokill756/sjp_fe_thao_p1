import ProtectedRoute from '../components/common/ProtectedRoute';

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Home Page</h1>
        <p className="text-lg text-gray-700">
          This is the home page of your new React Router app.
        </p>
      </div>
    </ProtectedRoute>
  );
}
