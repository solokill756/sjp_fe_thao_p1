import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import Input from '../common/Input';
import toast from 'react-hot-toast';

export default function RegisterForm() {
  const { t } = useTranslation('auth');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    agreeTerms: false,
    newsletter: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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

    if (formData.password !== formData.confirmPassword) {
      toast.error(t('register.passwordMismatch'));
      return;
    }

    if (!formData.agreeTerms) {
      toast.error(t('register.agreeTerms'));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error(t('register.invalidEmail'));
      return;
    }

    if (formData.password.length < 8) {
      toast.error(t('register.weakPassword'));
      return;
    }
  };

  return (
    <div className="px-2 sm:px-0">
      <p className="text-gray-600 mb-6 sm:mb-8 text-center text-sm sm:text-base">
        There are many advantages to creating an account: the payment process is
        faster, shipment tracking is possible and much more.
      </p>
      <form onSubmit={handleSubmit} className="w-full space-y-4 sm:space-y-6">
        <Input
          label={t('register.usernameLabel')}
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <Input
          label={t('register.emailLabel')}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label={t('register.passwordLabel')}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Input
          label={t('register.confirmPasswordLabel')}
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <Input
          type="radio"
          name="role"
          value={formData.role}
          onChange={handleChange}
          label=""
          options={[
            {
              value: 'customer',
              label: t('register.roleCustomer'),
              id: 'customer',
            },
            {
              value: 'vendor',
              label: t('register.roleVendor'),
              id: 'vendor',
            },
          ]}
        />

        <Input
          type="checkbox"
          name="agreeTerms"
          value={formData.agreeTerms}
          onChange={handleChange}
          label={t('register.agreeTerms')}
          required
        />

        <p className="text-xs text-gray-500 mb-4 sm:mb-6 leading-relaxed">
          {t('register.dataUsage')}
          <a href="#" className="text-indigo-600 hover:underline">
            {t('register.privacyPolicy')}
          </a>
          .
        </p>

        <div className="pt-2">
          <Button type="submit">{t('register.submitButton')}</Button>
        </div>
      </form>
    </div>
  );
}
