import { useTranslation } from 'react-i18next';
import OrderHistoryRow from '../components/orderHistory/OrderHistoryRow';
import { useGetOrdersByUserQuery } from '../features/api/apiSlice';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import Loading from '../components/common/Loading';
import ProtectedRoute from '../components/common/ProtectedRoute';

export default function OrderHistory() {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const { t } = useTranslation('orderHistory');
  const {
    data: mockOrders,
    isLoading,
    isError,
  } = useGetOrdersByUserQuery(userId ?? 0, {
    skip: !userId,
  });

  if (isLoading) {
    return <Loading fullScreen text={t('loading', 'Loading...')} />;
  }

  if (isError || !mockOrders) {
    return (
      <div className="text-center text-red-500">
        {t('error', 'Failed to load order history.')}
      </div>
    );
  }

  if (mockOrders.length === 0) {
    return (
      <div className="text-center text-gray-500">
        {t('noOrders', 'You have no orders yet.')}
      </div>
    );
  }

  return (
    <ProtectedRoute>
      {' '}
      <div className="bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900">{t('title')}</h1>
            <p className="mt-2 text-lg text-gray-600">{t('description')}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                {/* Table Header */}
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      {t('orderId', 'Order ID')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      {t('date', 'Date')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      {t('total', 'Total')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      {t('status', 'Status')}
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                      {t('action', 'Action')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockOrders.map((order) => (
                    <OrderHistoryRow key={order.id} order={order} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>{' '}
    </ProtectedRoute>
  );
}
