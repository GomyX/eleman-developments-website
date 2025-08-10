import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  pathnames: {
    '/': '/',
    '/projects': {
      ar: '/مشاريعنا',
      en: '/projects'
    },
    '/about': {
      ar: '/عن-الايمان',
      en: '/about'
    },
    '/investment': {
      ar: '/الاستثمار',
      en: '/investment'
    },
    '/locations': {
      ar: '/المواقع',
      en: '/locations'
    },
    '/contact': {
      ar: '/تواصل-معنا',
      en: '/contact'
    }
  }
});
