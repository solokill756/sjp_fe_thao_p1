import { useTranslation } from 'react-i18next';
import WidgetCard from '../common/WidgetCard';
import { MoreHorizontal } from 'lucide-react';
import type { recentProductsDataType } from '../../../config/admin/dashboard/dashboardConfig';
interface RecentProductsWidgetProps {
  recentProductsData: recentProductsDataType[];
}
const RecentProductsWidget: React.FC<RecentProductsWidgetProps> = ({
  recentProductsData,
}) => {
  const { t } = useTranslation('dashboard');
  return (
    <WidgetCard title={t('recent_products')} className="lg:col-span-2">
      <p className="text-sm text-gray-500 mb-4">{t('products_added_today')}</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase border-b">
              <th className="py-2 px-3 w-10">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="py-2 px-3">{t('photo')}</th>
              <th className="py-2 px-3">{t('name')}</th>
              <th className="py-2 px-3">{t('stock')}</th>
              <th className="py-2 px-3">{t('price')}</th>
              <th className="py-2 px-3">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {recentProductsData.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="py-3 px-3">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                </td>
                <td className="py-3 px-3 text-sm font-medium text-gray-800">
                  {product.name}
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      product.currentStock > 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {product.currentStock > 0
                      ? t('in_stock')
                      : t('out_of_stock')}
                  </span>
                </td>
                <td className="py-3 px-3 text-sm text-gray-700">
                  ${product.price.toFixed(2)}
                </td>
                <td className="py-3 px-3">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </WidgetCard>
  );
};

export default RecentProductsWidget;
