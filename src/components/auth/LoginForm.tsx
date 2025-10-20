import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../common/Input';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const { t } = useTranslation('auth');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [rememberMe, setRememberMe] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error(t('login.fillAllFields'));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error(t('login.invalidEmail'));
      return;
    }
  };

  return (
    <div className="px-2 sm:px-0">
      <p className="text-gray-600 mb-6 sm:mb-8 text-center text-sm sm:text-base">
        If you have an account, sign in with your username or email address.
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
          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            {t('login.rememberMe')}
          </label>
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
