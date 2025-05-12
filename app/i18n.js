import {createSharedPathnamesNavigation} from 'next-intl/navigation';

// Define the locales and default locale
export const locales = ['en', 'cs'];
export const defaultLocale = 'en';

// Create the navigation functions
export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation({
  locales,
  localePrefix: 'always'
});

// Export a function to get messages
export async function getMessages(locale) {
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
