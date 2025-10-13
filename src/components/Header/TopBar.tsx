import { useTranslation } from 'react-i18next';
import DropdownMenu from '../common/DropDownMenu';
import { useState } from 'react';

export default function TopBar() {
  const { t, i18n } = useTranslation('header');
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.language === 'vi' ? 'Vietnamese' : 'English'
  );
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const languages = ['English', 'Vietnamese'];
  const currencies = ['USD', 'VND'];
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    if (language === 'Vietnamese') {
      i18n.changeLanguage('vi');
    } else {
      i18n.changeLanguage('en');
    }
  };

  return (
    <div className="bg-gray-100 border-b border-gray-200 py-2 px-4">
      <div className="max-w-7xl mx-auto text-sm">
        {/* Desktop Layout */}
        <div className="hidden lg:flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-blue-600 transition-colors">
              {t('topBar.aboutUs')}
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              {t('topBar.myAccount')}
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              {t('topBar.wishlist')}
            </a>
            <span>
              {t('topBar.deliveryTime', {
                startTime: '7:00',
                endTime: '23:00',
              })}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu
              values={languages}
              selectedValue={selectedLanguage}
              onChange={handleLanguageChange}
            />

            <DropdownMenu
              values={currencies}
              selectedValue={selectedCurrency}
              onChange={setSelectedCurrency}
            />

            <a href="#" className="hover:text-blue-600 transition-colors">
              {t('topBar.orderTracking')}
            </a>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DropdownMenu
                values={languages}
                selectedValue={selectedLanguage}
                onChange={handleLanguageChange}
              />
              <DropdownMenu
                values={currencies}
                selectedValue={selectedCurrency}
                onChange={setSelectedCurrency}
              />
            </div>

            <span className="text-xs text-gray-600 hidden sm:block">
              {t('topBar.deliveryTime', {
                startTime: '7:00',
                endTime: '23:00',
              })}
            </span>
            <span className="text-xs text-gray-600 sm:hidden">7:00-23:00</span>
          </div>

          <div className="mt-2 flex items-center justify-center space-x-4 text-xs">
            <a href="#" className="hover:text-blue-600 transition-colors">
              {t('topBar.aboutUs')}
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              {t('topBar.myAccount')}
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              {t('topBar.wishlist')}
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              {t('topBar.orderTracking')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
