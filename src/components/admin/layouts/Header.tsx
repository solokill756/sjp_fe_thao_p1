import { Bell, Menu, Plus, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}
const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { t } = useTranslation('dashboard');

  return (
    <header className="flex-shrink-0 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button
            className="text-gray-600 mr-3 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            {t('overview')}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder={t('search_placeholder')}
              className="pl-10 pr-4 py-2 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <Bell size={22} />
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            <Plus size={18} />
            <span>{t('add_product')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
