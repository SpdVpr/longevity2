import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Define the locales and default locale
export const locales = ['en', 'cs'];
export const defaultLocale = 'en';

// Define types
export type Locale = typeof locales[number];

// Export a function to get messages
export async function getMessages(locale: string) {
  try {
    // Import the messages from the next-intl config
    const config = require('../../next-intl.config');

    // Return the messages for the locale or fallback to default locale
    return config.messages[locale] || config.messages[defaultLocale];
  } catch (error) {
    console.error('Error loading messages:', error);
    return {}; // Return empty object to prevent crashes
  }
}

export default getRequestConfig(async ({locale}) => {
  // Validate the locale
  if (!locales.includes(locale as Locale)) notFound();

  // Get messages for the current locale
  const safeLocale = locale || defaultLocale;
  const messages = await getMessages(safeLocale);

  return {
    messages,
    locale: safeLocale,
    timeZone: 'Europe/Prague'
  };
});
