import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from './i18n-config';
import type {Locale} from './i18n-config';

export default getRequestConfig(async ({locale}) => {
  // Validate the locale
  if (!locales.includes(locale as Locale)) notFound();

  try {
    // First try to load from the root locale file
    try {
      return {
        messages: (await import(`../messages/${locale}.json`)).default,
        locale: locale as string,
        timeZone: 'Europe/Prague'
      };
    } catch (rootError) {
      // Then try to load from the locale directory
      const messages = (await import(`../messages/${locale}/index.json`)).default;
      return {
        messages,
        locale: locale as string,
        timeZone: 'Europe/Prague'
      };
    }
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}, falling back to English`);

    // Fallback to English
    try {
      return {
        messages: (await import(`../messages/en.json`)).default,
        locale: defaultLocale,
        timeZone: 'Europe/Prague'
      };
    } catch (fallbackError) {
      console.error('Failed to load English messages:', fallbackError);
      return {
        messages: {},
        locale: defaultLocale,
        timeZone: 'Europe/Prague'
      };
    }
  }
});

export {locales, defaultLocale};
