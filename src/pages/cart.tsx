import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { CartItem } from '../models/CartModel';
import EmptyCart from '../components/cart/EmptyCart';

import { Link, useNavigate } from 'react-router-dom';
import CartSummary from '../components/cart/CartSummary';
import CartItemsList from '../components/cart/CartItemsList';
import { cartData } from '../data/data';
import ProtectedRoute from '../components/common/ProtectedRoute';

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>(cartData);
  const navigate = useNavigate();
  const { t } = useTranslation('cart');
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const handleRemoveItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
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
              <CartSummary subtotal={subtotal} />
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
