import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import {notFound} from 'next/navigation';

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
    // Load index messages
    const indexMessages = await import(`../messages/${locale}/index.json`);

    // Try to load other message files
    try {
      const aboutMessages = await import(`../messages/${locale}/about.json`);
      const articlesMessages = await import(`../messages/${locale}/articles.json`);
      const biomarkersMessages = await import(`../messages/${locale}/biomarkers.json`);
      const commonMessages = await import(`../messages/${locale}/common.json`);
      const contactMessages = await import(`../messages/${locale}/contact.json`);
      const dashboardMessages = await import(`../messages/${locale}/dashboard.json`);
      const nutritionMessages = await import(`../messages/${locale}/nutrition.json`);
      const researchMessages = await import(`../messages/${locale}/research.json`);
      const searchMessages = await import(`../messages/${locale}/search.json`);
      const supplementsMessages = await import(`../messages/${locale}/supplements.json`);
      const toolsMessages = await import(`../messages/${locale}/tools.json`);

      // Merge all messages
      return {
        ...indexMessages.default,
        about: aboutMessages.default,
        articles: articlesMessages.default,
        biomarkers: biomarkersMessages.default,
        common: commonMessages.default,
        contact: contactMessages.default,
        dashboard: dashboardMessages.default,
        nutrition: nutritionMessages.default,
        research: researchMessages.default,
        search: searchMessages.default,
        supplements: supplementsMessages.default,
        tools: toolsMessages.default
      };
    } catch (error) {
      console.error('Error loading message files:', error);
      return { ...indexMessages.default };
    }
  } catch (error) {
    // Fallback to English if messages for the locale are not found
    try {
      const indexMessages = await import(`../messages/${defaultLocale}/index.json`);
      return { ...indexMessages.default };
    } catch (innerError) {
      console.error('Could not load any messages:', innerError);
      notFound();
    }
  }
}
