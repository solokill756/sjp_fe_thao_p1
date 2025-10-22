import React from 'react';
import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ErrorIllustration from './ErrorIllustration';
import ErrorLayout from './ErrorLayout';

interface ErrorPageProps {
  errorCode?: number;
  title?: string;
  message?: string;
  showBackButton?: boolean;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  errorCode,
  title,
  message,
  showBackButton = true,
}) => {
  const navigate = useNavigate();
  const routeError = useRouteError();
  const { t } = useTranslation('error');

  let errorInfo = {
    code: errorCode || 500,
    title: title || t('common.title'),
    message: message || t('common.defaultMessage'),
  };

  if (routeError) {
    if (isRouteErrorResponse(routeError)) {
      errorInfo = {
        code: routeError.status,
        title: routeError.statusText || t('common.title'),
        message:
          routeError.data?.message ||
          routeError.data ||
          t('common.defaultMessage'),
      };
    } else if (routeError instanceof Error) {
      errorInfo = {
        code: 500,
        title: t('500.title'),
        message: routeError.message || t('500.message'),
      };
    }
  }

  return (
    <ErrorLayout
      code={errorInfo.code}
      title={errorInfo.title}
      message={errorInfo.message}
      onGoHome={() => navigate('/')}
      onGoBack={() => navigate(-1)}
      showBackButton={showBackButton}
      homeLabel={t('common.homeButton')}
      backLabel={t('common.backButton')}
      illustration={<ErrorIllustration code={errorInfo.code} />}
    />
  );
};

export default ErrorPage;
