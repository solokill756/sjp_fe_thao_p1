import { Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface WidgetCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  showInfo?: boolean;
  onViewAll?: () => void;
}
const WidgetCard: React.FC<WidgetCardProps> = ({
  title,
  children,
  className = '',
  showInfo = true,
  onViewAll,
}) => {
  const { t } = useTranslation('adminCommon');
  return (
    <div className={`bg-white p-4 md:p-6 rounded-lg shadow ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm text-blue-600 hover:underline"
          >
            {t('view_all')}
          </button>
        )}
        {showInfo && !onViewAll && (
          <button className="text-gray-400 hover:text-gray-600">
            <Info size={18} />
          </button>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default WidgetCard;
