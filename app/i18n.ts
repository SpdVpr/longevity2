import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
// Import directly from the main config file
import config from '../../next-intl.config.mjs';

// Define types
export type Locale = (typeof config.locales)[number];

// Define hardcoded messages for each locale
const messagesMap = {
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

export default getRequestConfig(async ({locale}) => {
  // Validate the locale
  if (!config.locales.includes(locale as any)) notFound();

  // Get messages for the current locale
  const messages = messagesMap[locale as keyof typeof messagesMap] || messagesMap.en;

  return {
    messages,
    locale: locale as string,
    timeZone: 'Europe/Prague'
  };
});
