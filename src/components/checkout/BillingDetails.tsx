import { useTranslation } from 'react-i18next';
import {
  countryOptions,
  stateOptions,
  type FormState,
} from '../../config/checkout/checkoutConfig';
import Input from '../common/Input';
import SelectInput from '../common/SelectInput';
import TextareaInput from '../common/TextareaInput';

interface BillingDetailsProps {
  formData: FormState;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const BillingDetails: React.FC<BillingDetailsProps> = ({
  formData,
  handleChange,
}) => {
  const { t } = useTranslation('checkout');
  return (
    <div className="lg:col-span-3">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
        {t('billingDetails', 'Billing Details')}
      </h2>

      <div className="grid sm:grid-cols-2 gap-x-6">
        <Input
          label={t('firstName', 'First name')}
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          label={t('lastName', 'Last name')}
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <Input
        label={t('companyName', 'Company name (optional)')}
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
      />

      <SelectInput
        label={t('country', 'Country / Region')}
        name="country"
        value={formData.country}
        onChange={handleChange}
        options={countryOptions}
        required
      />

      <Input
        label={t('streetAddress', 'Street address')}
        name="streetAddress"
        value={formData.streetAddress}
        onChange={handleChange}
        placeholder="House number and street name"
        required
      />

      <Input
        label={t('apartment', 'Apartment, suite, unit, etc. (optional)')}
        name="apartment"
        value={formData.apartment}
        onChange={handleChange}
        placeholder="Apartment, suite, unit, etc. (optional)"
      />

      <Input
        label={t('townCity', 'Town / City')}
        name="townCity"
        value={formData.townCity}
        onChange={handleChange}
        required
      />

      <SelectInput
        label={t('state', 'State')}
        name="state"
        value={formData.state}
        onChange={handleChange}
        options={stateOptions}
        required
      />

      <Input
        label={t('zipCode', 'ZIP Code')}
        name="zipCode"
        value={formData.zipCode}
        onChange={handleChange}
        required
      />

      <Input
        label={t('phone', 'Phone')}
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <Input
        label={t('email', 'Email address')}
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        label={t('shipToDifferentAddress', 'Ship to a different address?')}
        type="checkbox"
        name="shipToDifferentAddress"
        value={formData.shipToDifferentAddress}
        onChange={handleChange}
      />

      <TextareaInput
        label={t('orderNotes', 'Order notes (optional)')}
        name="orderNotes"
        value={formData.orderNotes}
        onChange={handleChange}
        placeholder={t(
          'orderNotesPlaceholder',
          'Notes about your order, e.g. special notes for delivery.'
        )}
        rows={5}
      />
    </div>
  );
};

export default BillingDetails;
