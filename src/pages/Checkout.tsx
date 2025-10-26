import { useEffect, useState } from 'react';
import type { FormState } from '../config/checkout/checkoutConfig';
import BillingDetails from '../components/checkout/BillingDetails';
import OrderSummary from '../components/checkout/OrderSummary';
import CheckoutHeader from '../components/checkout/CheckoutHeader';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import type { User } from '../models/userModel';
import type { Order, OrderItem } from '../models/checkoutModel';
import {
  useAddOrderMutation,
  useClearCartMutation,
  useGetCartsQuery,
  useUpdateProductMutation,
} from '../features/api/apiSlice';
import Loading from '../components/common/Loading';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { t } = useTranslation('checkout');
  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'US',
    streetAddress: '',
    apartment: '',
    townCity: '',
    state: 'CA',
    zipCode: '',
    phone: '',
    email: '',
    createAccount: false,
    shipToDifferentAddress: false,
    orderNotes: '',
    shippingMethod: 'flat_rate',
    paymentMethod: 'bank',
    agreeTerms: false,
  });
  const user: User | null = useSelector((state: RootState) => state.auth.user);
  const {
    data: productsCart,
    isLoading,
    isError,
  } = useGetCartsQuery(user?.id ?? 0, {
    skip: !user?.id,
  });
  const [addOrder, { isLoading: isAddingOrder }] = useAddOrderMutation();
  const [clearCart, { isLoading: isClearingCart }] = useClearCartMutation();
  const [updateProduct, { isLoading: isUpdatingProduct }] =
    useUpdateProductMutation();
  const subtotal =
    productsCart?.reduce(
      (acc, item) => acc + (item.product?.price ?? 0) * item.quantity,
      0
    ) ?? 0;
  const shippingCost = formData.shippingMethod === 'flat_rate' ? 15.0 : 0;
  const total = subtotal + shippingCost;
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
      }));
    }
  }, [user]);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === 'radio') {
      if (name === 'shippingMethod') {
        setFormData((prev) => ({
          ...prev,
          shippingMethod: value,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.zipCode.length < 5) {
      toast.error(t('error.invalidZipCode'));
      return;
    }
    if (!formData.agreeTerms) {
      toast.error(t('error.agreeTerms'));
      return;
    }
    if (formData.phone.length < 10) {
      toast.error(t('error.invalidPhone'));
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error(t('error.invalidEmail'));
      return;
    }

    const productOrders: OrderItem[] =
      productsCart?.map((item) => ({
        productId: item.product?.id || 0,
        name: item.product?.name || '',
        price: item.product?.price || 0,
        quantity: item.quantity,
      })) || [];
    const products = productsCart?.map((item) => item.product!) || [];

    const orderData: Order = {
      userId: user?.id || 0,
      createdAt: new Date().toISOString(),
      status: 'Processing',
      subtotal: subtotal,
      shippingCost: formData.shippingMethod === 'flat_rate' ? 15.0 : 0,
      total: total,
      paymentMethod: formData.paymentMethod,
      shippingMethod: formData.shippingMethod,
      contactEmail: formData.email,
      contactPhone: formData.phone,
      billingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName,
        streetAddress: formData.streetAddress,
        apartment: formData.apartment,
        townCity: formData.townCity,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
      shippingAddress: formData.shipToDifferentAddress
        ? {
            firstName: formData.firstName,
            lastName: formData.lastName,
            companyName: formData.companyName,
            streetAddress: formData.streetAddress,
            apartment: formData.apartment,
            townCity: formData.townCity,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          }
        : undefined,
      items: productOrders,

      orderNotes: formData.orderNotes,
    };
    try {
      await addOrder(orderData).unwrap();
      await Promise.all(
        products.map((product) =>
          updateProduct({
            ...product,
            stockCurrent:
              product.stockCurrent -
              productsCart?.find((item) => item.productId === product.id)
                ?.quantity!,
          })
        )
      );
      await clearCart(user?.id || 0).unwrap();
      toast.success(t('order_success', 'Order placed successfully!'));
      navigate('/order-history', { replace: true });
    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error(t('order_error', 'Failed to place order. Please try again.'));
    }
  };

  if (isAddingOrder || isClearingCart || isUpdatingProduct) {
    <Loading fullScreen text={t('loading', 'Loading...')} />;
  }

  return (
    <ProtectedRoute>
      <div className=" min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CheckoutHeader />

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-12">
            <BillingDetails formData={formData} handleChange={handleChange} />

            <OrderSummary
              formData={formData}
              handleChange={handleChange}
              cartItems={productsCart}
              isLoading={isLoading}
              isError={isError}
              subtotal={subtotal}
              total={total}
            />
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
