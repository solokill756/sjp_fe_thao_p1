import {
  Check,
  ChevronDown,
  Eye,
  MoreHorizontal,
  Search,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StatusBadge from '../../components/admin/order/StatusBadge';
import ActionsDropdown from '../../components/admin/common/ActionsDropdown';
import ActionItem from '../../components/admin/common/ActionItem';
import { useNavigate } from 'react-router-dom';
import {
  useGetOrdersQuery,
  useGetProductsQuery,
  useUpdateOrderMutation,
  useUpdateProductMutation,
} from '../../features/api/apiSlice';
import Loading from '../../components/common/Loading';
import { ServerErrorPage } from '../../components/error';
import toast from 'react-hot-toast';
import type { OrderStatus } from '../../config/historyCheckout/historyCheckoutConfig';

export default function Orders() {
  const { t } = useTranslation('adminOrders');
  const [openActionMenu, setOpenActionMenu] = useState<
    number | null | undefined
  >(null);
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('date');
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetOrdersQuery();
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
  const { data: products, isLoading: productsLoading } = useGetProductsQuery({
    tag: undefined,
  });
  const [updateProduct, { isLoading: isProductUpdating }] =
    useUpdateProductMutation();
  if (isLoading || isUpdating || productsLoading || isProductUpdating) {
    return <Loading fullScreen text={t('loading', 'Loading...')} />;
  }
  if (isError || !data) {
    return <ServerErrorPage />;
  }

  const handleOrderStatusChange = async (
    orderId: number,
    newStatus: string
  ) => {
    try {
      const order = data.find((o) => o.id === orderId);
      if (!order) {
        toast.error(t('order_not_found', 'Order not found.'));
        return;
      }
      const newOrder = { ...order, status: newStatus as OrderStatus };
      await updateOrder({ id: orderId, ...newOrder }).unwrap();
      if (newStatus === 'Cancelled') {
        if (products === undefined) {
          console.log('Products data is undefined');
          throw new Error('Products data is undefined');
        }
        await Promise.all(
          order.items.map(async (item) => {
            const product = products.find((p) => p.id === item.productId);
            if (product) {
              await updateProduct({
                ...product,
                stockCurrent: product.stockCurrent + item.quantity,
              }).unwrap();
            }
          })
        );
      }
      toast.success(t('order_status_updated', 'Order status updated.'));
    } catch (error) {
      console.error('Failed to update order status:', error);
      toast.error(
        t('order_status_update_failed', 'Failed to update order status.')
      );
    }
  };

  // Search theo tên
  let filteredOrders = data.filter((order) => {
    const name =
      order.billingAddress.firstName && order.billingAddress.lastName
        ? `${order.billingAddress.firstName} ${order.billingAddress.lastName}`
        : order.billingAddress.companyName || '';
    return name.toLowerCase().includes(search.toLowerCase());
  });

  // Sort
  filteredOrders = [...filteredOrders].sort((a, b) => {
    if (sortType === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortType === 'total') {
      return b.total - a.total;
    }
    if (sortType === 'name') {
      const nameA =
        a.billingAddress.firstName && a.billingAddress.lastName
          ? `${a.billingAddress.firstName} ${a.billingAddress.lastName}`
          : a.billingAddress.companyName || '';
      const nameB =
        b.billingAddress.firstName && b.billingAddress.lastName
          ? `${b.billingAddress.firstName} ${b.billingAddress.lastName}`
          : b.billingAddress.companyName || '';
      return nameA.localeCompare(nameB);
    }
    if (sortType === 'status') {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
      {/* Thanh filter và actions */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <div className="flex items-center space-x-2 w-full md:w-auto">
          {/* Các dropdown */}
          <select className="border rounded-md px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:outline-none">
            <option>{t('all_orders')}</option>
          </select>
          <select
            className="border rounded-md px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:outline-none"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="date">{t('sort_by_date', 'Sort by date')}</option>
            <option value="total">{t('sort_by_total', 'Sort by total')}</option>
            <option value="name">{t('sort_by_name', 'Sort by name')}</option>
            <option value="status">
              {t('sort_by_status', 'Sort by status')}
            </option>
          </select>
          <select className="border rounded-md px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:outline-none">
            <option>10</option>
          </select>
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-gray-400" />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('search_placeholder')}
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            <span>{t('actions')}</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase bg-gray-50 border-b">
              <th className="py-3 px-3 w-10">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="py-3 px-3">{t('id')}</th>
              <th className="py-3 px-3">{t('name')}</th>
              <th className="py-3 px-3">{t('date')}</th>
              <th className="py-3 px-3">{t('total')}</th>
              <th className="py-3 px-3">{t('status')}</th>
              <th className="py-3 px-3">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="py-3 px-3 text-sm font-medium text-blue-600">
                  #{order.id}
                </td>
                <td className="py-3 px-3 text-sm font-medium text-gray-800">
                  {order.billingAddress.firstName &&
                  order.billingAddress.lastName
                    ? `${order.billingAddress.firstName} ${order.billingAddress.lastName}`
                    : order.billingAddress.companyName || t('unknown_user')}
                </td>
                <td className="py-3 px-3 text-sm text-gray-700">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-3 text-sm text-gray-700">
                  ${order.total.toFixed(2)}
                </td>
                <td className="py-3 px-3">
                  <StatusBadge status={order.status} />
                </td>
                <td
                  className="py-3 px-3"
                  style={{ position: 'relative', zIndex: 20 }}
                >
                  {order.status === 'Processing' ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenActionMenu(
                            openActionMenu === order.id ? null : order.id
                          )
                        }
                        onBlur={() =>
                          setTimeout(() => setOpenActionMenu(null), 150)
                        }
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <MoreHorizontal size={20} />
                      </button>
                      {openActionMenu === order.id && (
                        <div
                          style={{
                            position: 'absolute',
                            right: 0,
                            top: '100%',
                            zIndex: 999,
                          }}
                        >
                          <ActionsDropdown>
                            <ActionItem
                              icon={Eye}
                              label={t('view_order_details')}
                              onClick={() => {
                                navigate(`/admin/orders/${order.id}`);
                                setOpenActionMenu(null);
                              }}
                            />
                            <ActionItem
                              icon={Check}
                              label={t('accept_order')}
                              onClick={() => {
                                handleOrderStatusChange(order.id!, 'Shipping');
                                setOpenActionMenu(null);
                              }}
                            />
                            <ActionItem
                              icon={XCircle}
                              variant="danger"
                              label={t('cancel_order')}
                              onClick={() => {
                                handleOrderStatusChange(order.id!, 'Cancelled');
                                setOpenActionMenu(null);
                              }}
                            />
                          </ActionsDropdown>
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                    >
                      <Eye size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
