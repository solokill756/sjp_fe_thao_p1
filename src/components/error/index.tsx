import React from 'react';
import { useTranslation } from 'react-i18next';
import ErrorPage from './ErrorPage';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation('error');
  return (
    <ErrorPage
      errorCode={404}
      title={t('404.title')}
      message={t('404.message')}
    />
  );
};

export const ForbiddenPage: React.FC = () => {
  const { t } = useTranslation('error');
  return (
    <ErrorPage
      errorCode={403}
      title={t('403.title')}
      message={t('403.message')}
    />
  );
};

export const ServerErrorPage: React.FC = () => {
  const { t } = useTranslation('error');
  return (
    <ErrorPage
      errorCode={500}
      title={t('500.title')}
      message={t('500.message')}
    />
  );
};

export const NetworkErrorPage: React.FC = () => {
  const { t } = useTranslation('error');
  return (
    <ErrorPage
      errorCode={0}
      title={t('network.title')}
      message={t('network.message')}
    />
  );
};

export default ErrorPage;
