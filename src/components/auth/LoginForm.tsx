import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../common/Input';
import Button from '../common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/api/apiSlice';
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from '../common/Loading';
import { ServerErrorPage } from '../error';

export default function LoginForm() {
  const { t } = useTranslation('auth');
  const [login, { isLoading, isError }] = useLoginMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);
    if (!formData.email || !formData.password) {
      toast.error(t('login.fillAllFields'));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error(t('login.invalidEmail'));
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      if (!result) {
        toast.error(t('login.invalidCredentials'));
        return;
      }

      toast.success(t('login.success'));
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(t('login.invalidCredentials'));
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="large" fullScreen text={t('login.loading')} />;
  }

  if (isError) {
    return <ServerErrorPage />;
  }

  return (
    <div className="px-2 sm:px-0">
      <p className="text-gray-600 mb-6 sm:mb-8 text-center text-sm sm:text-base">
        {t('login.welcomeBack')}
      </p>
      <form onSubmit={handleSubmit} className="w-full space-y-4 sm:space-y-6">
        <Input
          label={t('login.emailLabel')}
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label={t('login.passwordLabel')}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
          <Link
            to="#"
            className="font-semibold text-sm text-indigo-600 hover:text-indigo-700 self-start sm:self-auto"
          >
            {t('login.forgotPassword')}
          </Link>
        </div>
        <div className="pt-2">
          <Button type="submit">{t('login.submitButton')}</Button>
        </div>
      </form>
    </div>
  );
}
