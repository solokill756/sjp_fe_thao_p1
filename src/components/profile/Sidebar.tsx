import SidebarLink from './SidebarLink';
import UserIcon from './UserIcon';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { useTranslation } from 'react-i18next';

export default function Sidebar() {
  const { t } = useTranslation('profile');
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <aside className="lg:col-span-1">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4 pb-6 border-b border-gray-200">
          <div className="bg-gray-100 p-3 rounded-full">
            <UserIcon />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('welcome_back')}</p>
            <p className="font-semibold text-gray-800">
              {user ? user.username : 'Guest'}
            </p>
          </div>
        </div>
        <nav className="mt-6 space-y-1">
          <SidebarLink href="#" title={t('orders')} />
          <SidebarLink href="#" title={t('account_details')} isActive={true} />
          <SidebarLink href="#" title={t('wishlist')} />
          <SidebarLink href="#" title={t('log_out')} />
        </nav>
      </div>
    </aside>
  );
}
