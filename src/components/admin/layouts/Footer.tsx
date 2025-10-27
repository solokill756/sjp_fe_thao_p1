import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation('adminCommon');
  return (
    <footer className="p-4 bg-white border-t text-sm text-gray-500 flex justify-between items-center">
      <span>{t('copyright')}</span>
      <div className="space-x-4">
        <a href="#" className="hover:text-blue-600">
          {t('licenses')}
        </a>
        <a href="#" className="hover:text-blue-600">
          {t('change_log')}
        </a>
        <a href="#" className="hover:text-blue-600">
          {t('get_help')}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
