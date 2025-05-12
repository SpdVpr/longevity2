import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from './i18n-config';
import type {Locale} from './i18n-config';

export default getRequestConfig(async ({locale}) => {
  // Validate the locale
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    locale: locale as string
  };
});

export {locales, defaultLocale};
