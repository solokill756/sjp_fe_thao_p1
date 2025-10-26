import { useTranslation } from 'react-i18next';
import type { FormState } from '../../config/checkout/checkoutConfig';
import Button from '../common/Button';
import Input from '../common/Input';

interface OrderSummaryProps {
  formData: FormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  formData,
  handleChange,
}) => {
  const { t } = useTranslation('checkout');
  return (
    <div className="lg:col-span-2">
      <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 sticky top-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
          {t('yourOrder', 'Your order')}
        </h2>

        {/* Bảng tóm tắt đơn hàng */}
        <div className="space-y-4">
          <div className="flex justify-between text-gray-800 font-medium">
            <span>{t('product', 'Product')}</span>
            <span>{t('subtotal', 'Subtotal')}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 border-t border-gray-200 pt-4">
            <span>
              {t('productName', 'Marketside Fresh Organic Bananas, Bunch × 1')}
            </span>
            <span className="font-medium text-gray-800">
              {t('productPrice', '$0.89')}
            </span>
          </div>

          <div className="flex justify-between text-gray-800 font-medium border-t border-gray-200 pt-4">
            <span>{t('subtotal', 'Subtotal')}</span>
            <span className="font-medium">{t('subtotalPrice', '$0.89')}</span>
          </div>

          {/* Shipping */}
          <div className="border-t border-gray-200 pt-4">
            <span className="text-gray-800 font-medium mb-2 block">
              {t('shipping', 'Shipping')}
            </span>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <Input
                  label={t('flatRate', 'Flat rate: $15.00')}
                  type="radio"
                  name="shippingMethod"
                  value="flat_rate"
                  onChange={handleChange}
                  checked={formData.shippingMethod === 'flat_rate'}
                />
              </div>
              <div className="flex justify-between items-center text-sm">
                <Input
                  label={t('localPickup', 'Local pickup')}
                  type="radio"
                  name="shippingMethod"
                  value="local_pickup"
                  onChange={handleChange}
                  checked={formData.shippingMethod === 'local_pickup'}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-200 pt-4">
            <span>{t('total', 'Total')}</span>
            <span>
              {formData.shippingMethod === 'flat_rate'
                ? t('totalFlatRate', '$15.89')
                : t('totalLocalPickup', '$0.89')}
            </span>
          </div>
        </div>

        {/* Phương thức thanh toán */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <Input
                type="radio"
                label={t('bankTransfer', 'Direct Bank Transfer')}
                name="paymentMethod"
                value="bank"
                onChange={handleChange}
                checked={formData.paymentMethod === 'bank'}
              />
              {formData.paymentMethod === 'bank' && (
                <p className="text-xs text-gray-500 mt-2 pl-6">
                  {t(
                    'bankTransferDesc',
                    'Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.'
                  )}
                </p>
              )}
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <Input
                type="radio"
                label={t('checkPayments', 'Check Payments')}
                name="paymentMethod"
                value="check"
                onChange={handleChange}
                checked={formData.paymentMethod === 'check'}
              />
              {formData.paymentMethod === 'check' && (
                <p className="text-xs text-gray-500 mt-2 pl-6">
                  {t(
                    'checkPaymentsDesc',
                    'Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.'
                  )}
                </p>
              )}
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <Input
                type="radio"
                label={t('cod', 'Cash On Delivery')}
                name="paymentMethod"
                value="cod"
                onChange={handleChange}
                checked={formData.paymentMethod === 'cod'}
              />
              {formData.paymentMethod === 'cod' && (
                <p className="text-xs text-gray-500 mt-2 pl-6">
                  {t('codDesc', 'Pay with cash upon delivery.')}
                </p>
              )}
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            {t(
              'personalDataNotice',
              'Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our '
            )}
            <a href="#" className="text-indigo-600 font-medium hover:underline">
              {t('privacyPolicy', 'privacy policy')}
            </a>
            .
          </p>

          <div className="mt-6">
            <Input
              label={
                <span>
                  {t(
                    'agreeTermsPrefix',
                    'I have read and agree to the website'
                  )}{' '}
                  <a
                    href="#"
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    {t('termsAndConditions', 'terms and conditions')}
                  </a>{' '}
                  *
                </span>
              }
              type="checkbox"
              name="agreeTerms"
              value={formData.agreeTerms}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              variant="primary"
              disabled={!formData.agreeTerms}
              className="w-full"
            >
              {t('placeOrder', 'Place order')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
