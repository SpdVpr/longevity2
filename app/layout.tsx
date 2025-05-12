import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Longevity Hub - Science-backed strategies for longevity",
  description: "Discover evidence-based approaches to extend your healthspan and lifespan with the latest longevity research and practical tips.",
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'cs' }];
}

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

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  const validLocales = ['en', 'cs'];
  if (!validLocales.includes(locale)) {
    locale = 'en';
  }

  // Get messages for the current locale
  const messages = messagesMap[locale as keyof typeof messagesMap] || messagesMap.en;

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
