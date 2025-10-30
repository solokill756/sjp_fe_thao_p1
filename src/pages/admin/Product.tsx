import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import ProductTable from '../../components/admin/product/ProductTable';
import Sidebar from '../../components/shop/Sidebar';
import { useEffect, useMemo, useState } from 'react';
import { resetFilters } from '../../features/shop/filterSlice';
import {
  useEditProductMutation,
  useGetCategoriesQuery,
  useGetProductsQuery,
} from '../../features/api/apiSlice';
import Loading from '../../components/common/Loading';
import { ServerErrorPage } from '../../components/error';
import type { SortOption } from '../../config/shop/shopConfig';
import type { Product } from '../../models/productModel';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Product() {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(
    {
      tag: undefined,
    },
    {
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }
  );
  const { t } = useTranslation('adminProducts');
  const navigate = useNavigate();
  const { data: categories, isLoading: CLoading } = useGetCategoriesQuery();
  const allPrices = products ? products.map((p) => p.price) : [];
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.filter, shallowEqual);
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [editProduct, { isLoading: isEditing }] = useEditProductMutation();
  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

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

  // Function to filter and sort products

  const filteredAndSortedProducts = useMemo(() => {
    let processedProducts = products ? [...products] : [];

    processedProducts = processedProducts.filter((p) => {
      const { categories, status } = filters;
      if (p.isDeleted) return false;
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
      if (status != undefined && status.inStock && p.stockCurrent <= 0)
        return false;
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

  const handleEditProduct = (productId: number) => {
    if (!productId) {
      toast.error(t('invalid_product_id'));
      return;
    }
    navigate(`/admin/products/${productId}/edit`);
  };

  const handleDeleteProduct = async (product: Product) => {
    if (!product.id) {
      toast.error(t('invalid_product_id'));
      return;
    }
    const confirm = window.confirm(t('confirm_delete_product'));
    if (!confirm) {
      return;
    }
    try {
      await editProduct({ ...product, isDeleted: true }).unwrap();
      toast.success(t('product_deleted_successfully'));
    } catch (error) {
      console.error(t('delete_product_error'), error);
      toast.error(t('failed_to_delete_product'));
    }
  };

  if (isError || !products) {
    return <ServerErrorPage />;
  }
  if (isLoading || CLoading) {
    return <Loading fullScreen text="Loading products..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-8">
      <div className="container mx-auto max-w-screen-2xl">
        <div className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-8">
          <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
            <Sidebar
              priceMin={PRICE_MIN}
              priceMax={PRICE_MAX}
              filters={filters}
              categories={categories}
            />
          </div>
          <div className="w-full lg:w-3/4">
            {isEditing && <Loading text={t('deleting_product')} />}
            {!isEditing && (
              <ProductTable
                products={filteredAndSortedProducts}
                sortOption={sortOption}
                setSortOption={setSortOption}
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
