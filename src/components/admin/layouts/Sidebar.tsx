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
import { useLocation } from 'react-router-dom';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}
const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { t } = useTranslation('dashboard');
  const location = useLocation();

  // Map itemKey to pathname
  const routeMap: Record<string, string> = {
    dashboard: '/admin',
    orders: '/admin/orders',
    products: '/admin/products',
    buyer: '/admin/buyer',
    customers: '/admin/customers',
    invoices: '/admin/invoices',
    profile: '/admin/profile',
    users: '/admin/users',
    authentication: '/admin/auth',
    error_pages: '/admin/error',
    settings: '/admin/settings',
  };

  const navGroups = [
    {
      title: t('ecommerce'),
      items: [
        { itemKey: 'dashboard', icon: LayoutDashboard },
        { itemKey: 'orders', icon: ShoppingCart },
        { itemKey: 'products', icon: Package },
        { itemKey: 'buyer', icon: Users },
        { itemKey: 'customers', icon: Users },
        { itemKey: 'invoices', icon: CreditCard },
      ],
    },

    {
      title: t('pages'),
      items: [
        { itemKey: 'profile', icon: User },
        { itemKey: 'users', icon: Users },
        { itemKey: 'authentication', icon: LogIn },
        { itemKey: 'error_pages', icon: AlertCircle },
        { itemKey: 'settings', icon: Settings },
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
                {group.items.map((item) => {
                  const isActive = location.pathname === routeMap[item.itemKey];
                  return (
                    <NavItem
                      key={item.itemKey}
                      icon={item.icon}
                      itemKey={item.itemKey}
                      active={isActive}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
