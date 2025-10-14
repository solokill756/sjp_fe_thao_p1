import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
export default function Auth() {
  const { t } = useTranslation('auth');
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center mb-6 sm:mb-10">
        <h1
          onClick={() => setActiveTab('login')}
          className={`text-lg sm:text-xl font-light cursor-pointer px-3 sm:px-4 py-2 transition-colors duration-300 ${
            activeTab === 'login'
              ? 'text-gray-900 font-semibold border-b-2 border-indigo-600'
              : 'text-gray-400'
          }`}
        >
          {t('login.title')}
        </h1>
        <h1
          onClick={() => setActiveTab('register')}
          className={`text-lg sm:text-xl font-light cursor-pointer px-3 sm:px-4 py-2 transition-colors duration-300 ${
            activeTab === 'register'
              ? 'text-gray-900 font-semibold border-b-2 border-indigo-600'
              : 'text-gray-400'
          }`}
        >
          {t('register.title')}
        </h1>
      </div>
      {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
