import { useTranslation } from 'react-i18next';
import { HiClock, HiMail, HiPhone } from 'react-icons/hi';

export default function ContactInfo() {
  const { t } = useTranslation('footer');
  return (
    <div>
      <h4 className="font-semibold text-gray-800 mb-4 md:mb-6">
        {t('sections.help.title')}
      </h4>
      <p className="text-sm text-gray-600 mb-4">
        {t('sections.help.description')}
      </p>

      <div className="space-y-3">
        <div className="flex items-start text-sm">
          <HiClock className="w-4 h-4 mr-2 text-gray-500 mt-0.5 flex-shrink-0" />
          <span className="break-words">{t('sections.help.schedule')}</span>
        </div>

        <div className="flex items-start text-base md:text-lg font-bold">
          <HiPhone className="w-4 h-4 md:w-5 md:h-5 mr-2 text-gray-500 mt-0.5 flex-shrink-0" />
          <span className="break-all">{t('sections.help.phone')}</span>
        </div>

        <div className="flex items-start text-sm">
          <HiMail className="w-4 h-4 mr-2 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-gray-600 break-words">
              {t('sections.help.emailTitle')}
            </p>
            <p className="font-medium break-all">{t('sections.help.email')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
