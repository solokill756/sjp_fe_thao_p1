import { useTranslation } from 'react-i18next';

import { Link, useNavigate } from 'react-router-dom';

import ProtectedRoute from '../components/common/ProtectedRoute';
import {
  useDeleteCartItemMutation,
  useGetCartsQuery,
  useUpdateCartItemMutation,
} from '../features/api/apiSlice';
import { LoadingSpinner } from '../components/common/Loading';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import toast from 'react-hot-toast';
import type { NewCartItem } from '../models/CartModel';
import { ServerErrorPage } from '../components/error';
import CartItemsList from '../components/cart/CartItemsList';
import EmptyCart from '../components/cart/EmptyCart';
import CartSummary from '../components/cart/CartSummary';

export default function Cart() {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [updateItemInCart, { isLoading: isUpdating }] =
    useUpdateCartItemMutation();
  const [deleteItemFromCart, { isLoading: isDeleting }] =
    useDeleteCartItemMutation();
  const {
    data: items,
    isLoading,
    isError,
  } = useGetCartsQuery(userId!, {
    skip: !userId,
  });
  const navigate = useNavigate();
  const { t } = useTranslation('cart');
  const handleQuantityChange = async (
    id: number,
    newQuantity: number,
    productId: number
  ) => {
    try {
      const dataRequest: NewCartItem = {
        quantity: newQuantity,
        userId: userId!,
        productId: productId,
        added_at: new Date(),
      };
      await updateItemInCart({ ...dataRequest, id }).unwrap();
      toast.success(
        t('update_quantity_success', 'Quantity updated successfully.')
      );
    } catch (error) {
      console.error('Failed to update cart item quantity:', error);
      toast.error(t('update_quantity_error', 'Failed to update quantity.'));
    }
  };
  const handleRemoveItem = async (id: number) => {
    try {
      await deleteItemFromCart({ id, userId: userId! }).unwrap();
      toast.success(t('remove_item_success', 'Item removed successfully.'));
    } catch (error) {
      console.error('Failed to remove cart item:', error);
      toast.error(t('remove_item_error', 'Failed to remove item from cart.'));
    }
  };
  if (isUpdating || isDeleting || isLoading || items === undefined) {
    return <LoadingSpinner fullScreen />;
  }

  if (isError) {
    return <ServerErrorPage />;
  }

  const subtotal = items.reduce(
    (acc, item) => acc + (item.product?.price ?? 0) * item.quantity,
    0
  );
  return (
    <ProtectedRoute>
      <div className="min-h-screen font-sans antialiased text-gray-900 bg-white">
        <header className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="text-sm text-gray-500">
              <Link to="/" className="hover:underline">
                {t('home', 'Home')}
              </Link>
              <span className="mx-2">/</span>
              <span className="font-medium text-gray-700">
                {t('cart', 'Cart')}
              </span>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {items.length === 0 ? (
            <EmptyCart onReturn={() => navigate('/shop')} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-12">
              <CartItemsList
                items={items}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
              <CartSummary subtotal={subtotal} productCarts={items} />
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
