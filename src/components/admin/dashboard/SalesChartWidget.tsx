import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import WidgetCard from '../common/WidgetCard';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts';
import type { salesChartDataType } from '../../../config/admin/dashboard/dashboardConfig';

interface SalesChartWidgetProps {
  data: salesChartDataType[];
  totalSales: number;
  salesPercentage: number;
  percentageType: 'increase' | 'decrease';
  month: string;
}

const SalesChartWidget: React.FC<SalesChartWidgetProps> = ({
  data: salesChartData,
  totalSales,
  salesPercentage,
  percentageType,
  month,
}) => {
  const { t } = useTranslation('dashboard');
  return (
    <WidgetCard
      title={t('sales_chart')}
      className="lg:col-span-2"
      showInfo={true}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="text-3xl font-bold text-gray-800">
            {totalSales.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </h4>
          <div
            className={`flex items-center text-sm ${
              percentageType === 'increase' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {percentageType === 'increase' ? (
              <ArrowUpRight size={16} />
            ) : (
              <ArrowDownRight size={16} />
            )}
            <span>{salesPercentage.toFixed(2)}%</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600">{t('sales')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">{t('order')}</span>
          </div>
          <input
            type="text"
            readOnly
            value={month}
            className="px-3 py-1 border rounded-md text-sm bg-gray-50 w-24 text-center"
          />
        </div>
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={salesChartData}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
            <YAxis axisLine={false} tickLine={false} dx={-10} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="Sales"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Order"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
};
export default SalesChartWidget;
