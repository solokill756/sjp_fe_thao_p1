import { useTranslation } from 'react-i18next';

export default function IncomeOpportunities() {
  const { t } = useTranslation('footer');

  return (
    <div>
      <h4 className="font-semibold text-gray-800 mb-4 md:mb-6">
        {t('sections.makeMoney.title')}
      </h4>
      <ul className="space-y-2 md:space-y-3 text-sm text-gray-600">
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.makeMoney.links.sellOnOrgani')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.makeMoney.links.sellServices')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.makeMoney.links.sellBusiness')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.makeMoney.links.sellApps')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.makeMoney.links.becomeAffiliate')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.makeMoney.links.advertiseProducts')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.makeMoney.links.sellPublish')}
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-900">
            {t('sections.makeMoney.links.becomeVendor')}
          </a>
        </li>
      </ul>
    </div>
  );
}
