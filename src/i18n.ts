import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import footerEn from './locales/en/footer.json';
import headerEn from './locales/en/header.json';
import footerVi from './locales/vi/footer.json';
import headerVi from './locales/vi/header.json';

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
    },
    vi: {
      header: headerVi,
      footer: footerVi,
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
