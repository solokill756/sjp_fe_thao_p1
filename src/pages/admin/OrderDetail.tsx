import { ArrowLeft, FileText, MapPin, UserCheck } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import StatusBadge from '../../components/admin/order/StatusBadge';
import { useTranslation } from 'react-i18next';
import {
  useGetOrderByIdQuery,
  useGetProductsQuery,
} from '../../features/api/apiSlice';
import { NotFoundPage } from '../../components/error';
import Loading from '../../components/common/Loading';
import InfoCard from '../../components/admin/orderDetail/InfoCard';

export default function AdminOrderDetail() {
  const { t } = useTranslation('adminOrderDetail');
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const { data: products, isLoading: productsLoading } = useGetProductsQuery({
    tag: undefined,
  });
  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(Number(orderId), {
    skip: !orderId,
  });

  if (isLoading || productsLoading) {
    return (
      <Loading fullScreen text={t('loading', 'Loading order details...')} />
    );
  }
  if (isError || !order) {
    return <NotFoundPage />;
  }
  console.log('Order details:', order);
  return (
    <div className="flex flex-col gap-6">
      {/* Nút Back và Tiêu đề */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate('/admin/orders')}
          className="flex items-center space-x-2 text-sm text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} />
          <span>{t('back_to_orders')}</span>
        </button>
      </div>

      {/* Thẻ thông tin Order */}
      <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            {t('order')} #{order.id}
          </h3>
          <span className="text-sm text-gray-500">
            {t('order_date')}: {new Date(order.createdAt).toLocaleDateString()}
          </span>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột trái: Chi tiết, Summary */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Bảng sản phẩm */}
          <div className="bg-white p-4 rounded-lg shadow">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase border-b">
                  <th className="py-2 px-3">{t('item')}</th>
                  <th className="py-2 px-3">{t('price')}</th>
                  <th className="py-2 px-3">{t('quantity')}</th>
                  <th className="py-2 px-3 text-right">{t('total')}</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr
                    key={item.productId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={
                            products
                              ? products.find((p) => p.id === item.productId)
                                  ?.imageUrls[0]
                              : ''
                          }
                          alt={item.name}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {item.name}
                          </p>
                          {item.quantity === 0 && (
                            <span className="text-xs text-red-500">
                              {t('out_of_stock')}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-sm text-gray-700">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-sm text-gray-700">
                      x {item.quantity}
                    </td>
                    <td className="py-3 px-3 text-sm text-gray-700 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tóm tắt */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-semibold text-gray-800 border-b pb-2 mb-3">
              {t('order_summary')}
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('subtotal')}:</span>
                <span className="font-medium text-gray-800">
                  ${order.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('shipping')}:</span>
                <span className="font-medium text-gray-800">
                  ${order.shippingCost.toFixed(2)}
                </span>
              </div>

              <div className="border-t pt-2 mt-2 flex justify-between">
                <span className="text-md font-bold text-gray-800">
                  {t('total')}:
                </span>
                <span className="text-md font-bold text-gray-800">
                  ${(order.subtotal + order.shippingCost).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải: Thông tin KH, Địa chỉ */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <InfoCard title={t('customer_info')} icon={UserCheck}>
            <div className="flex items-center space-x-2">
              <img
                src={`https://placehold.co/40x40/E2E8F0/334155?text=${order.billingAddress.firstName.charAt(
                  0
                )}${order.billingAddress.lastName.charAt(0) || ''}`}
                alt={
                  order.billingAddress.lastName &&
                  order.billingAddress.firstName
                    ? `${order.billingAddress.firstName} ${order.billingAddress.lastName}`
                    : 'Customer Avatar'
                }
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-800">
                  {order.billingAddress.firstName &&
                  order.billingAddress.lastName
                    ? `${order.billingAddress.firstName} ${order.billingAddress.lastName}`
                    : order.billingAddress.companyName ||
                      t('anonymous', 'Anonymous')}
                </p>
                <p className="text-gray-500">{order.contactEmail}</p>
              </div>
            </div>
            <p className="mt-2">
              <strong>{t('phone')}:</strong> {order.contactPhone}
            </p>
          </InfoCard>

          <InfoCard title={t('shipping_address')} icon={MapPin}>
            <p>
              {order.shippingAddress
                ? order.shippingAddress.companyName
                : order.billingAddress.companyName}
            </p>
            <p>
              {order.shippingAddress
                ? order.shippingAddress.streetAddress
                : order.billingAddress.streetAddress}
            </p>
            <p>
              {order.shippingAddress
                ? order.shippingAddress.townCity
                : order.billingAddress.townCity}
              {order.shippingAddress
                ? `, ${order.shippingAddress.zipCode} ${order.shippingAddress.zipCode}`
                : ''}
            </p>
            <p>
              {order.shippingAddress
                ? order.shippingAddress?.country
                : order.billingAddress?.country}
            </p>
          </InfoCard>

          <InfoCard title={t('billing_address')} icon={FileText}>
            <p>{order.billingAddress.companyName}</p>
            <p>{order.billingAddress.streetAddress}</p>
            <p>
              {order.billingAddress.townCity}, {order.billingAddress.state}{' '}
              {order.billingAddress.zipCode}
            </p>
            <p>{order.billingAddress.country}</p>
          </InfoCard>
        </div>
      </div>
    </div>
  );
}
