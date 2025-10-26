import { useNavigate, useParams } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../features/api/apiSlice';
import Loading from '../components/common/Loading';
import { useTranslation } from 'react-i18next';

import Button from '../components/common/Button';
import OrderDetailHeader from '../components/orderDetail/OrderDetailHeader';
import OrderItemsList from '../components/orderDetail/OrderItemsList';
import OrderTotalSummary from '../components/orderDetail/OrderTotalSummary';
import OrderInfoCard from '../components/orderDetail/OrderInfoCard';
import AddressDisplay from '../components/orderDetail/AddressDisplay';
import ProtectedRoute from '../components/common/ProtectedRoute';

export default function OrderDetail() {
  const { t } = useTranslation('orderDetail');
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const onBack = () => {
    navigate('/order-history');
  };
  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(Number(orderId));
  if (isLoading) {
    return (
      <Loading size="large" text={t('loading', 'Loading order details...')} />
    );
  }
  if (isError || !order) {
    return (
      <div className=" py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          {t('notFound', 'Order not found.')}
        </h2>
        <Button onClick={onBack} className="mt-4">
          &larr; {t('backToHistory', 'Back to History')}
        </Button>
      </div>
    );
  }
  return (
    <ProtectedRoute>
      <div className=" py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Button onClick={onBack} className="mb-4 text-lg">
            &larr; {t('backToOrderHistory', 'Back to Order History')}
          </Button>

          <OrderDetailHeader order={order} />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
                {t('itemsOrdered', 'Items Ordered')}
              </h2>
              <OrderItemsList items={order.items} />
              <OrderTotalSummary order={order} />
            </div>

            <div className="space-y-8">
              <OrderInfoCard title={t('shippingAddress', 'Shipping Address')}>
                <AddressDisplay
                  address={order.shippingAddress ?? order.billingAddress}
                />
              </OrderInfoCard>
              <OrderInfoCard title={t('paymentMethod', 'Payment Method')}>
                <p>{order.paymentMethod}</p>
              </OrderInfoCard>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
