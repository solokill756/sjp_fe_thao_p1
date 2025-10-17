import { useTranslation } from 'react-i18next';

export default function ToKnowLinks() {
  const { t } = useTranslation('footer');
  return (
    <div>
      <h4 className="font-semibold text-gray-800 mb-4 md:mb-6">
        {t('sections.getToKnow.title')}
      </h4>
      <ul className="space-y-2 md:space-y-3 text-sm text-gray-600">
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.getToKnow.links.careers')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.getToKnow.links.about')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.getToKnow.links.investor')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.getToKnow.links.devices')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.getToKnow.links.reviews')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.getToKnow.links.social')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.getToKnow.links.stores')}
          </a>
        </li>
      </ul>
    </div>
  );
}
