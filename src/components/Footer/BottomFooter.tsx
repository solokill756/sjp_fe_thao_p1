import { useTranslation } from 'react-i18next';
import SupportedPayments from './SupportedPayments';

export default function BottomFooter() {
  const { t } = useTranslation('footer');

  return (
    <div className="border-t border-gray-200 py-4 md:py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-gray-600">
                {t('bottom.copyright', {
                  link: (
                    <a href="#" className="text-blue-600 hover:underline">
                      {t('bottom.poweredBy')}
                    </a>
                  ),
                })}
              </p>

              <SupportedPayments />
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              {t('bottom.links.terms')}
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              {t('bottom.links.privacy')}
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              {t('bottom.links.orderTracking')}
            </a>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-4 text-center">
          <div className="flex justify-center">
            <SupportedPayments />
          </div>

          <p className="text-xs text-gray-600">
            {t('bottom.copyright', {
              link: (
                <a href="#" className="text-blue-600 hover:underline">
                  {t('bottom.poweredBy')}
                </a>
              ),
            })}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              {t('bottom.links.terms')}
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              {t('bottom.links.privacy')}
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              {t('bottom.links.orderTracking')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
