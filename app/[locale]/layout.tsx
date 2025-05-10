import { NextIntlClientProvider } from 'next-intl';
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

// Initialize fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Import components
import Header from '../components/Header';
import Footer from '../components/Footer';
import PreviewBanner from '../components/PreviewBanner';
import { Providers } from '../providers';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Get the locale from params
  const locale = params.locale || 'en';

  // Get messages for the current locale
  let messages = {};

  // Use require instead of dynamic import for server component
  try {
    // Load index messages
    const indexMessages = require(`../../messages/${locale}/index.json`);

    // Try to load research messages
    try {
      const researchMessages = require(`../../messages/${locale}/research.json`);
      // Merge all messages
      messages = { ...indexMessages, research: researchMessages };
    } catch (error) {
      // Fallback to English if research messages for the locale are not found
      if (locale !== 'en') {
        try {
          const researchMessages = require(`../../messages/en/research.json`);
          messages = { ...indexMessages, research: researchMessages };
        } catch (innerError) {
          console.error('Could not load research messages:', innerError);
          messages = { ...indexMessages };
        }
      } else {
        messages = { ...indexMessages };
      }
    }
  } catch (error) {
    // Fallback to English if messages for the locale are not found
    const indexMessages = require(`../../messages/en/index.json`);
    let researchMessages = {};
    try {
      researchMessages = require(`../../messages/en/research.json`);
    } catch (innerError) {
      console.error('Could not load English research messages:', innerError);
    }
    messages = { ...indexMessages, research: researchMessages };
  }

  // Preview mode is disabled for now
  const isPreview = false;

  // Use locale directly
  const finalLocale = locale;

  return (
    <html lang={finalLocale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <NextIntlClientProvider locale={finalLocale} messages={messages}>
            <PreviewBanner isPreview={isPreview} />
            <Header />
            <main>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
