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
import { getMessages } from '../messages/index';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: 'Longevity Hub',
    description: 'Science-backed strategies for longevity and healthspan',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Get the locale from params
  const locale = params.locale || 'en';

  // Get messages for the current locale using the helper function
  const messages = await getMessages(locale);

  // Preview mode is disabled for now
  const isPreview = false;

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
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
