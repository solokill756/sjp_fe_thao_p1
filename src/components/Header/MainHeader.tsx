import {
  HiShoppingBag,
  HiLocationMarker,
  HiSearch,
  HiUser,
  HiHeart,
  HiShoppingCart,
  HiChevronDown,
} from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import type { RootState, AppDispatch } from '../../app/store';

import {
  getAuthenticatedMenuItems,
  getGuestMenuItems,
} from '../../config/Header/mainHeaderConfig';
import toast from 'react-hot-toast';
import { logOut } from '../../features/auth/authSlice';

interface MenuItem {
  label: string;
  onClick: () => void;
  className: string;
  isDivider?: boolean;
}

export default function MainHeader() {
  const { t } = useTranslation('header');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogout = () => {
    if (!isAuthenticated) return;
    try {
      dispatch(logOut());
      localStorage.removeItem('loggedInUser');
      toast.success(t('mainHeader.logoutSuccess'));
      navigate('/auth?tab=login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(t('mainHeader.logoutError'));
    }
  };

  const authenticatedMenuItems: MenuItem[] =
    getAuthenticatedMenuItems(navigate);

  const guestMenuItems: MenuItem[] = getGuestMenuItems(navigate);

  const menuItems = isAuthenticated ? authenticatedMenuItems : guestMenuItems;

  if (isAuthenticated) {
    menuItems.push({
      label: 'Sign Out',
      onClick: handleLogout,
      className: 'text-red-500',
      isDivider: true,
    });
  }

  return (
    <div className="bg-white py-2 md:py-4 px-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center mr-6">
              <div className="bg-orange-500 p-2 rounded-lg mr-2">
                <HiShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                {t('mainHeader.logo')}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center text-sm text-gray-600 mr-6">
              <HiLocationMarker className="w-4 h-4 mr-1" />
              <div>
                <div className="text-xs">{t('mainHeader.deliverTo')}</div>
                <div className="font-medium">all</div>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-6">
            <div className="relative">
              <input
                type="text"
                placeholder={t('mainHeader.searchPlaceholder')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <HiSearch className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center text-sm hover:text-blue-600 transition-colors">
                <HiUser className="w-5 h-5 mr-1" />
                <div>
                  <div className="text-xs">
                    {isAuthenticated
                      ? `Hello, ${user ? user.username : 'User'}`
                      : t('mainHeader.signIn')}
                  </div>
                  <div className="font-medium flex items-center">
                    {t('mainHeader.account')}
                    <HiChevronDown className="ml-1 w-3 h-3" />
                  </div>
                </div>
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1">
                  {menuItems.map((item) => (
                    <Fragment key={item.label}>
                      {item.isDivider && (
                        <div className="border-t border-gray-100 my-1"></div>
                      )}
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`w-full text-left px-4 py-2 text-sm ${
                              active
                                ? item.className === 'text-red-500'
                                  ? 'bg-gray-100 text-red-600'
                                  : 'bg-gray-100 text-gray-900'
                                : item.className
                            }`}
                            onClick={item.onClick}
                          >
                            {item.label}
                          </button>
                        )}
                      </Menu.Item>
                    </Fragment>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>

            <button className="relative">
              <HiHeart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            <button className="relative">
              <HiShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-orange-500 p-1.5 rounded-lg mr-2">
                <HiShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold text-gray-800">
                {t('mainHeader.logo')}
              </span>
            </div>
            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {/* Mobile User Dropdown Menu */}
              <Menu as="div" className="relative">
                <Menu.Button className="relative">
                  <HiUser className="w-5 h-5 text-gray-600" />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1">
                    {menuItems.map((item) => (
                      <Fragment key={item.label}>
                        {item.isDivider && (
                          <div className="border-t border-gray-100 my-1"></div>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`w-full text-left px-4 py-2 text-sm ${
                                active
                                  ? item.className === 'text-red-500'
                                    ? 'bg-gray-100 text-red-600'
                                    : 'bg-gray-100 text-gray-900'
                                  : item.className
                              }`}
                              onClick={item.onClick}
                            >
                              {item.label}
                            </button>
                          )}
                        </Menu.Item>
                      </Fragment>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>

              <button className="relative">
                <HiHeart className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </button>

              <button className="relative">
                <HiShoppingCart className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder={t('mainHeader.searchPlaceholder')}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <HiSearch className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          {/* Location */}
          <div className="flex items-center justify-center text-xs text-gray-600 py-1">
            <HiLocationMarker className="w-3 h-3 mr-1" />
            <span>
              {t('mainHeader.deliverTo')} <strong>all</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
