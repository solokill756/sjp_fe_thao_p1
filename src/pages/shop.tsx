import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { SortOption, ViewMode } from '../config/shop/shopConfig';
import Toolbar from '../components/shop/Toolbar';
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from '../features/api/apiSlice';
import { shallowEqual, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { ProductGrid } from '../components/home';
import Pagination from '../components/shop/Pagination';
import { LoadingSpinner } from '../components/common/Loading';
import { ServerErrorPage } from '../components/error';
import Sidebar from '../components/shop/Sidebar';

export default function Shop() {
  const { t } = useTranslation('shop');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const filters = useSelector((state: RootState) => state.filter, shallowEqual);
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(undefined, {
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetCategoriesQuery(undefined, {
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const allPrices = products ? products.map((p) => p.price) : [];
  const PRICE_MIN =
    products && products.length > 0 ? Math.floor(Math.min(...allPrices)) : 0;
  const PRICE_MAX =
    products && products.length > 0 ? Math.ceil(Math.max(...allPrices)) : 0;

  const filterMin =
    filters.price?.min !== null && filters.price?.min !== undefined
      ? Number(filters.price.min)
      : null;
  const filterMax =
    filters.price?.max !== null && filters.price?.max !== undefined
      ? Number(filters.price.max)
      : null;
  const filteredAndSortedProducts = useMemo(() => {
    let processedProducts = products ? [...products] : [];

    processedProducts = processedProducts.filter((p) => {
      const { categories, status } = filters;

      const productPrice = p.salePercentage
        ? p.price
        : p.originalPrice
        ? p.originalPrice
        : 0;

      if (filterMin !== null && productPrice < filterMin) return false;
      if (filterMax !== null && productPrice > filterMax) return false;
      if (
        categories != undefined &&
        categories.length > 0 &&
        !categories.includes(p.categoryId)
      )
        return false;
      if (status != undefined && status.inStock && !p.inStock) return false;
      if (status != undefined && status.onSale && !p.salePercentage)
        return false;
      return true;
    });

    // Sắp xếp
    switch (sortOption) {
      case 'price-asc':
        processedProducts.sort(
          (a, b) =>
            (a.salePercentage
              ? a.price
              : a.originalPrice
              ? a.originalPrice
              : 0) -
            (b.salePercentage ? b.price : b.originalPrice ? b.originalPrice : 0)
        );
        break;
      case 'price-desc':
        processedProducts.sort(
          (a, b) =>
            (b.salePercentage
              ? b.price
              : b.originalPrice
              ? b.originalPrice
              : 0) -
            (a.salePercentage ? a.price : a.originalPrice ? a.originalPrice : 0)
        );
        break;
      case 'rating-desc':
        processedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return processedProducts;
  }, [
    filters.price?.min,
    filters.price?.max,
    filters.categories?.join(','),
    filters.status?.inStock,
    filters.status?.onSale,
    products,
    sortOption,
  ]);
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [
    filters.price?.min,
    filters.price?.max,
    filters.categories?.join(','),
    filters.status?.inStock,
    filters.status?.onSale,
    itemsPerPage,
  ]);

  if (isLoading || isLoadingCategories) {
    return <LoadingSpinner />;
  }
  if (isError || isErrorCategories) {
    return <ServerErrorPage />;
  }
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">
            {t('title')}
          </h1>
          <p className="text-gray-600 mt-2">{t('subtitle')}</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Sidebar
              priceMin={PRICE_MIN}
              priceMax={PRICE_MAX}
              filters={filters}
              categories={categories!}
            />
          </div>
          <main className="lg:col-span-3">
            <Toolbar
              totalResults={filteredAndSortedProducts.length}
              sortOption={sortOption}
              setSortOption={setSortOption}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
            {paginatedProducts.length > 0 ? (
              <ProductGrid
                products={paginatedProducts}
                title={t('filterResults')}
                viewMode={viewMode}
                showViewAll={false}
              />
            ) : (
              <div className="text-center py-16 px-6 bg-white rounded-lg border">
                <h3 className="text-xl font-semibold text-gray-700">
                  {t('noProducts')}
                </h3>
                <p className="text-gray-500 mt-2">{t('tryAdjustingFilters')}</p>
              </div>
            )}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
