import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';

interface VendorFormData {
  firstName: string;
  lastName: string;
  shopName: string;
  shopURL: string;
  phoneNumber: string;
  termsAccepted: boolean;
}

export default function ProfileForm() {
  const { t } = useTranslation('profile');
  const [formData, setFormData] = useState<VendorFormData>({
    firstName: '',
    lastName: '',
    shopName: '',
    shopURL: '',
    phoneNumber: '',
    termsAccepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emptyFields = Object.keys(formData).filter(
      (key) => !formData[key as keyof typeof formData]
    );
    if (emptyFields.length > 0) {
      toast.error(t('register.fillAllFields'));
      return;
    }

    if (formData.phoneNumber.length < 10) {
      toast.error(t('invalid_phone_number'));
      return;
    }
  };

  return (
    <div className="lg:col-span-3">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {t('update_profile_details')}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label={t('first_name')}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required={true}
          />
          <Input
            label={t('last_name')}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required={true}
          />

          <Input
            label={t('phone_number')}
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            required={true}
          />

          <div>
            <Button
              variant="custom"
              type="submit"
              className="inline-flex justify-center py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {t('update_profile')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
