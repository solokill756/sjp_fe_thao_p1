import { useTranslation } from 'react-i18next';
import type { OrderAddress } from '../../models/checkoutModel';

interface AddressDisplayProps {
  address: OrderAddress | string;
}

const AddressDisplay: React.FC<AddressDisplayProps> = ({ address }) => {
  const { t } = useTranslation('orderDetail');
  if (typeof address === 'string') {
    return <p>{address}</p>;
  }
  if (!address) {
    return <p>{t('noAddress', 'No address provided')}</p>;
  }
  return (
    <>
      <p className="font-medium">{`${address.firstName} ${address.lastName}`}</p>
      {address.companyName && <p>{address.companyName}</p>}
      <p>{address.streetAddress}</p>
      {address.apartment && <p>{address.apartment}</p>}
      <p>{`${address.townCity}, ${address.state} ${address.zipCode}`}</p>
      <p>{address.country}</p>
    </>
  );
};

export default AddressDisplay;
