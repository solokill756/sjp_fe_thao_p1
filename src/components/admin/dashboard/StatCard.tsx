import { MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ElementType;
  chartData: { v: number }[];
  chartColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  chartData,
  chartColor,
}) => {
  const { t } = useTranslation('dashboard');
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Icon className="text-gray-600" size={20} />
          </div>
          <span className="text-gray-500">{title}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </div>
      <h4 className="text-2xl font-bold text-gray-800 mt-3">{value}</h4>
      <div className="flex justify-between items-end mt-1">
        <div className="text-xs">
          <span
            className={`font-semibold ${
              changeType === 'increase' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {change}
          </span>
          <span className="text-gray-500"> {t('over_last_month')}</span>
        </div>
        <div style={{ width: '50%', height: 30 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="v"
                stroke={chartColor}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
