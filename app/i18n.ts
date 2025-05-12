import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from './i18n-config';
import type {Locale} from './i18n-config';

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
  if (!locales.includes(locale as Locale)) notFound();

  // Get messages for the current locale
  const messages = messagesMap[locale as keyof typeof messagesMap] || messagesMap.en;

  return {
    messages,
    locale: locale as string,
    timeZone: 'Europe/Prague'
  };
});

export {locales, defaultLocale};
