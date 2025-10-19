import ProtectedRoute from '../components/common/ProtectedRoute';
import Sidebar from '../components/profile/Sidebar';
import VendorForm from '../components/profile/ProfileForm';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const { t } = useTranslation('profile');
  return (
    <ProtectedRoute>
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8">
          <nav className="flex mb-4 sm:mb-6 md:mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm">
              <li className="inline-flex items-center">
                <a
                  href="/"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {t('home')}
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-1 md:mx-2 text-gray-400">›</span>
                  <span className="text-gray-500">{t('my_account')}</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <Sidebar />
            <VendorForm />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
