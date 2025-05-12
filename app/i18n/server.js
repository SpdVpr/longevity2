import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale, getMessages} from '../i18n';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming locale is valid
  if (!locales.includes(locale)) {
    locale = defaultLocale;
  }

  // Ensure locale is always a string
  const safeLocale = locale || defaultLocale;

  // Get messages using the helper function
  const messages = await getMessages(safeLocale);

  return {
    locale: safeLocale,
    messages,
    timeZone: 'Europe/Prague'
  };
});
