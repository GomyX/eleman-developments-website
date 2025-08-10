import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({ locale }) => {
  const supportedLocales = routing.locales as readonly string[];
  const resolvedLocale =
    locale && supportedLocales.includes(locale) ? locale : routing.defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`../../messages/${resolvedLocale}.json`)).default
  };
});