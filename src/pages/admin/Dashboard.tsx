import CustomerRatingWidget from '../../components/admin/dashboard/CustomerRatingWidget';

import RecentProductsWidget from '../../components/admin/dashboard/RecentProductsWidget';
import RecentReviewsWidget from '../../components/admin/dashboard/RecentReviewsWidget';
import SalesChartWidget from '../../components/admin/dashboard/SalesChartWidget';

import {
  useGetOrdersQuery,
  useGetProductsQuery,
  useGetReviewsQuery,
} from '../../features/api/apiSlice';
import Loading from '../../components/common/Loading';
import { type salesChartDataType } from '../../config/admin/dashboard/dashboardConfig';
import StatCard from '../../components/admin/dashboard/StatCard';
import { useTranslation } from 'react-i18next';
import { CreditCard, ShoppingCart } from 'lucide-react';

export default function Dashboard() {
  const { t } = useTranslation('dashboard');
  const { data: orders, isLoading, isError } = useGetOrdersQuery();
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useGetProductsQuery({
    tag: undefined,
  });
  const {
    data: reviews,
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useGetReviewsQuery();
  if (isLoading || productsLoading || reviewsLoading) {
    return <Loading fullScreen text={t('loading', 'Loading dashboard...')} />;
  }
  if (
    isError ||
    !orders ||
    productsError ||
    !products ||
    reviewsError ||
    !reviews
  ) {
    return (
      <div className="text-center text-red-500 py-8">
        {t('no_data', 'No data available.')}
      </div>
    );
  }

  // Chỉ tính các order có status là Delivered hoặc Shipping
  const filteredOrders = orders.filter(
    (order) => order.status === 'Delivered' || order.status === 'Shipping'
  );

  const salesChartDataMap: Record<string, { Sales: number; Order: number }> =
    {};
  filteredOrders.forEach((order) => {
    const dayLabel = new Date(order.createdAt).toLocaleDateString();
    if (!salesChartDataMap[dayLabel]) {
      salesChartDataMap[dayLabel] = { Sales: 0, Order: 0 };
    }
    salesChartDataMap[dayLabel].Sales += order.total;
    salesChartDataMap[dayLabel].Order += 1;
  });
  const salesChartData: salesChartDataType[] = Object.entries(
    salesChartDataMap
  ).map(([day, value]) => ({
    name: day,
    Sales: value.Sales,
    Order: value.Order,
  }));

  const recentProductsData = [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5)
    .map((product) => ({
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrls[0] || '',
      price: product.price,
      currentStock: product.stockCurrent,
      dateAdded: new Date(product.createdAt).toLocaleDateString(),
    }));
  const currentMonth = new Date().getMonth();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const currentMonthSales = filteredOrders
    .filter((order) => new Date(order.createdAt).getMonth() === currentMonth)
    .reduce((acc, order) => acc + order.total, 0);

  const lastMonthSales = filteredOrders
    .filter((order) => new Date(order.createdAt).getMonth() === lastMonth)
    .reduce((acc, order) => acc + order.total, 0);

  const salesPercentage =
    lastMonthSales === 0
      ? 1
      : (currentMonthSales - lastMonthSales) / lastMonthSales;
  const ordersChartData = salesChartData.map((data) => ({
    v: data.Order,
  }));
  const salesChartStatData = salesChartData.map((data) => ({
    v: data.Sales,
  }));
  const rating =
    products.reduce((acc, product) => acc + product.rating, 0) /
    products.length;
  const ratingCount = products.reduce(
    (acc, product) => acc + product.reviewCount,
    0
  );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Cột chính (bên trái) */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <SalesChartWidget
          data={salesChartData}
          month={new Date(0, currentMonth).toLocaleString('default', {
            month: 'long',
          })}
          totalSales={currentMonthSales}
          salesPercentage={salesPercentage}
          percentageType={salesPercentage >= 0 ? 'increase' : 'decrease'}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title={t('orders', 'Orders')}
            value={orders.length.toString()}
            change={(salesPercentage * 100).toFixed(1) + '%'}
            changeType={salesPercentage >= 0 ? 'increase' : 'decrease'}
            icon={ShoppingCart}
            chartData={ordersChartData}
            chartColor="#F59E0B"
          />
          <StatCard
            title={t('sales', 'Sales')}
            value={currentMonthSales.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
            change={(salesPercentage * 100).toFixed(1) + '%'}
            changeType={salesPercentage >= 0 ? 'increase' : 'decrease'}
            icon={CreditCard}
            chartData={salesChartStatData}
            chartColor="#10B981"
          />
          <CustomerRatingWidget
            rating={rating}
            ratingCount={ratingCount}
            pointsChange={0}
          />
        </div>
        <RecentProductsWidget recentProductsData={recentProductsData} />
      </div>

      {/* Cột phụ (bên phải) */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        <RecentReviewsWidget reviews={reviews} />
      </div>
    </div>
  );
}
