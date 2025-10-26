import { useState } from 'react';
import type { FormState } from '../config/checkout/checkoutConfig';
import BillingDetails from '../components/checkout/BillingDetails';
import OrderSummary from '../components/checkout/OrderSummary';
import CheckoutHeader from '../components/checkout/CheckoutHeader';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emptyFields = Object.keys(formData).filter(
      (key) => !formData[key as keyof typeof formData]
    );
    if (emptyFields.length > 0) {
      toast.error(t('error.fillAllFields'));
      return;
    }
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
  };

  return (
    <ProtectedRoute>
      <div className=" min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CheckoutHeader />

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-12">
            <BillingDetails formData={formData} handleChange={handleChange} />

            <OrderSummary formData={formData} handleChange={handleChange} />
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
