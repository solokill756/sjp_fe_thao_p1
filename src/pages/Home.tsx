import ProtectedRoute from '../components/common/ProtectedRoute';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation('home');
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-700">{t('description')}</p>
      </div>
    </ProtectedRoute>
  );
}
