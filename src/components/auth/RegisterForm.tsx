import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';
import toast from 'react-hot-toast';
import {
  useLazyGetUserByEmailQuery,
  usePostUserMutation,
} from '../../features/api/apiSlice';
import { LoadingSpinner } from '../common/Loading';
import { ServerErrorPage } from '../error';

export default function RegisterForm() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer' as 'customer' | 'admin',
    agreeTerms: false,
  });
  const [
    getUserByEmailTrigger,
    { data: foundUser, isLoading: isFindingUser, isError: isFindUserError },
  ] = useLazyGetUserByEmailQuery();
  const [postUser, { isLoading: isRegistering }] = usePostUserMutation();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'role') {
      setFormData({ ...formData, [name]: value as 'customer' | 'admin' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
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

    try {
      await getUserByEmailTrigger(formData.email).unwrap();

      if (foundUser) {
        toast.error(t('register.userExists'));
        return;
      }
      const { confirmPassword, agreeTerms, ...userData } = formData;
      await postUser(userData).unwrap();

      // Show success message
      toast.success(t('register.success'));

      // Reset form
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'customer' as 'customer' | 'admin',
        agreeTerms: false,
      });

      // Navigate to login tab
      navigate('/auth?tab=login');
    } catch (error) {
      toast.error(t('register.error'));
    }
  };

  if (isFindingUser) {
    return (
      <LoadingSpinner size="large" fullScreen text={t('register.loading')} />
    );
  }

  if (isFindUserError) {
    return <ServerErrorPage />;
  }

  if (isRegistering) {
    return (
      <LoadingSpinner
        size="large"
        fullScreen
        text={t('register.registering')}
      />
    );
  }

  return (
    <div className="px-2 sm:px-0">
      <p className="text-gray-600 mb-6 sm:mb-8 text-center text-sm sm:text-base">
        {t('register.intro')}
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
          <Button type="submit" disabled={isRegistering}>
            {isRegistering
              ? t('register.registering')
              : t('register.submitButton')}
          </Button>
        </div>
      </form>
    </div>
  );
}
