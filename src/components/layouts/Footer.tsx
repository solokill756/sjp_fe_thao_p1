import { HiMail } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import MainFooter from '../Footer/MainFooter';
import BottomFooter from '../Footer/BottomFooter';

export default function Footer() {
  const { t } = useTranslation('footer');

  return (
    <footer className="bg-gray-50">
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {t('newsletter.title')}
              </h3>
              <p className="text-gray-600">{t('newsletter.description')}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  className="pl-10 pr-4 py-3 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap">
                {t('newsletter.button')}
              </button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {t('newsletter.title')}
            </h3>
            <p className="text-gray-600 mb-6">{t('newsletter.description')}</p>

            <div className="space-y-4">
              <div className="relative">
                <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full">
                {t('newsletter.button')}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-4 text-center md:text-right">
          <p className="text-xs md:text-sm text-gray-600">
            {t('newsletter.terms', {
              termsLink: (
                <a href="#" className="text-purple-600 hover:underline">
                  {t('newsletter.termsText')}
                </a>
              ),
              policyLink: (
                <a href="#" className="text-purple-600 hover:underline">
                  {t('newsletter.policyText')}
                </a>
              ),
            })}
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <MainFooter />
      {/* Bottom Footer */}
      <BottomFooter />
    </footer>
  );
}
