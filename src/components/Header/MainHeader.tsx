import {
  HiShoppingBag,
  HiLocationMarker,
  HiSearch,
  HiUser,
  HiHeart,
  HiShoppingCart,
} from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

export default function MainHeader() {
  const { t } = useTranslation('header');

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
            <button className="flex items-center text-sm">
              <HiUser className="w-5 h-5 mr-1" />
              <div>
                <div className="text-xs">{t('mainHeader.signIn')}</div>
                <div className="font-medium">{t('mainHeader.account')}</div>
              </div>
            </button>

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
              <button className="relative">
                <HiUser className="w-5 h-5 text-gray-600" />
              </button>

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
