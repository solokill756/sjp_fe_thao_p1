import { useTranslation } from 'react-i18next';

export default function HelpLinks() {
  const { t } = useTranslation('footer');
  return (
    <div>
      <h4 className="font-semibold text-gray-800 mb-4 md:mb-6">
        {t('sections.letUsHelp.title')}
      </h4>
      <ul className="space-y-2 md:space-y-3 text-sm text-gray-600">
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.letUsHelp.links.accessibility')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.letUsHelp.links.yourOrders')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.letUsHelp.links.returns')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.letUsHelp.links.shipping')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.letUsHelp.links.refund')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.letUsHelp.links.privacy')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.letUsHelp.links.terms')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.letUsHelp.links.cookies')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.letUsHelp.links.helpCenter')}
          </a>
        </li>
      </ul>
    </div>
  );
}
