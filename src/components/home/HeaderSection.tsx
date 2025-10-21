import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface HeaderSectionProps {
  title: string;
  subTitle: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ title, subTitle }) => {
  const { t } = useTranslation('home');
  return (
    <div className="flex justify-between items-baseline">
      <div className="flex items-baseline space-x-3">
        <h2 className="text-2xl font-bold text-gray-900 pl-1 md:pl-2">
          {title}
        </h2>
        <p className="text-sm text-gray-600">{subTitle}</p>
      </div>
      <Link
        to="#"
        className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center"
      >
        {t('viewAll', 'View All')}
        <ArrowRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  );
};

export default HeaderSection;
