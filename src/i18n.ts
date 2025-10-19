import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import footerEn from './locales/en/footer.json';
import headerEn from './locales/en/header.json';
import authEn from './locales/en/auth.json';
import errorEn from './locales/en/error.json';
import commonEn from './locales/en/common.json';
import profileEn from './locales/en/profile.json';
import footerVi from './locales/vi/footer.json';
import headerVi from './locales/vi/header.json';
import authVi from './locales/vi/auth.json';
import errorVi from './locales/vi/error.json';
import commonVi from './locales/vi/common.json';
import profileVi from './locales/vi/profile.json';

// Detect language from localStorage or browser
const savedLanguage =
  typeof window !== 'undefined' ? localStorage.getItem('language') : null;
const browserLanguage =
  typeof window !== 'undefined'
    ? window.navigator.language.split('-')[0]
    : 'en';
const defaultLanguage =
  savedLanguage || (browserLanguage === 'vi' ? 'vi' : 'en');

i18n.use(initReactI18next).init({
  resources: {
    en: {
      header: headerEn,
      footer: footerEn,
      auth: authEn,
      error: errorEn,
      common: commonEn,
      profile: profileEn,
    },
    vi: {
      header: headerVi,
      footer: footerVi,
      auth: authVi,
      error: errorVi,
      common: commonVi,
      profile: profileVi,
    },
  },
  lng: defaultLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

// Save language changes to localStorage
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lng);
  }
});

export default i18n;
