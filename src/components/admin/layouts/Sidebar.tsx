import {
  AlertCircle,
  CreditCard,
  LayoutDashboard,
  LogIn,
  Package,
  Settings,
  ShoppingCart,
  User,
  Users,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from '../common/Logo';
import NavItem from '../common/NavItem';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}
const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { t } = useTranslation('dashboard');

  const navGroups = [
    {
      title: t('ecommerce'),
      items: [
        { label: t('dashboard'), icon: LayoutDashboard, active: true },
        { label: t('orders'), icon: ShoppingCart },
        { label: t('products'), icon: Package },
        { label: t('buyer'), icon: Users },
        { label: t('customers'), icon: Users },
        { label: t('invoices'), icon: CreditCard },
      ],
    },

    {
      title: t('pages'),
      items: [
        { label: t('profile'), icon: User },
        { label: t('users'), icon: Users },
        { label: t('authentication'), icon: LogIn },
        { label: t('error_pages'), icon: AlertCircle },
        { label: t('settings'), icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Lớp phủ cho mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <nav
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white flex-col transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex lg:flex-shrink-0`}
      >
        <Logo />
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {navGroups.map((group) => (
            <div key={group.title}>
              <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    active={item.active}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
