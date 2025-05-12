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
    // First try to load from the root locale file
    try {
      return (await import(`../messages/${locale}.json`)).default;
    } catch (rootError) {
      console.log('Root locale file not found, trying directory structure');
    }

    // Then try to load index messages from the directory structure
    const indexMessages = await import(`../messages/${locale}/index.json`);

    // Initialize result with index messages
    const result = { ...indexMessages.default };

    // Try to load each additional message file individually
    const messageFiles = [
      'about', 'articles', 'biomarkers', 'common', 'contact',
      'dashboard', 'mental-health', 'nutrition', 'research',
      'search', 'supplements', 'tools'
    ];

    for (const file of messageFiles) {
      try {
        const messages = await import(`../messages/${locale}/${file}.json`);
        result[file] = messages.default;
      } catch (error) {
        console.log(`Optional message file ${file} not found for locale ${locale}`);
      }
    }

    return result;
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);

    // Fallback to English
    try {
      // First try root English file
      try {
        return (await import(`../messages/${defaultLocale}.json`)).default;
      } catch (rootError) {
        console.log('Root English file not found, trying directory structure');
      }

      // Then try English directory structure
      const indexMessages = await import(`../messages/${defaultLocale}/index.json`);
      return { ...indexMessages.default };
    } catch (fallbackError) {
      console.error('Could not load any messages:', fallbackError);
      return {}; // Return empty object instead of notFound to prevent crashes
    }
  }
}
