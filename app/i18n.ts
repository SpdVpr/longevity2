import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Define the locales and default locale
export const locales = ['en', 'cs'];
export const defaultLocale = 'en';

// Define types
export type Locale = typeof locales[number];

// Define message type
type Messages = {
  [key: string]: {
    app: {
      title: string;
      description: string;
    };
    navigation: {
      home: string;
      about: string;
      contact: string;
      articles: string;
      categories: string;
      tools: string;
      dashboard: string;
      profile: string;
      signIn: string;
      signUp: string;
      signOut: string;
    };
    common: {
      readMore: string;
      viewAll: string;
      loading: string;
      error: string;
      search: string;
      notFound: string;
      back: string;
    };
  };
};

// Export a function to get messages
export async function getMessages(locale: string) {
  try {
    // Define hardcoded messages for each locale
    const messages: Messages = {
      en: {
        app: {
          title: "Longevity Hub",
          description: "Science-backed strategies for longevity"
        },
        navigation: {
          home: "Home",
          about: "About",
          contact: "Contact",
          articles: "Articles",
          categories: "Categories",
          tools: "Tools",
          dashboard: "Dashboard",
          profile: "Profile",
          signIn: "Sign In",
          signUp: "Sign Up",
          signOut: "Sign Out"
        },
        common: {
          readMore: "Read More",
          viewAll: "View All",
          loading: "Loading...",
          error: "An error occurred",
          search: "Search",
          notFound: "Not Found",
          back: "Back"
        }
      },
      cs: {
        app: {
          title: "Longevity Hub",
          description: "Vědecky podložené strategie pro dlouhověkost"
        },
        navigation: {
          home: "Domů",
          about: "O nás",
          contact: "Kontakt",
          articles: "Články",
          categories: "Kategorie",
          tools: "Nástroje",
          dashboard: "Nástěnka",
          profile: "Profil",
          signIn: "Přihlásit se",
          signUp: "Registrovat se",
          signOut: "Odhlásit se"
        },
        common: {
          readMore: "Číst více",
          viewAll: "Zobrazit vše",
          loading: "Načítání...",
          error: "Došlo k chybě",
          search: "Hledat",
          notFound: "Nenalezeno",
          back: "Zpět"
        }
      }
    };

    // Return the messages for the locale or fallback to default locale
    return messages[locale] || messages[defaultLocale];
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
