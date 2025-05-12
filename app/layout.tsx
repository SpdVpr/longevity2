import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

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

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    // First try to load from the root locale file
    try {
      messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (rootError) {
      // Then try to load from the locale directory
      try {
        // Load index messages
        const indexMessages = (await import(`../../messages/${locale}/index.json`)).default;
        messages = { ...indexMessages };

        // Try to load additional message files
        const messageFiles = [
          'about', 'tools', 'dashboard', 'mental-health', 'articles',
          'biomarkers', 'common', 'contact', 'nutrition', 'research',
          'search', 'supplements'
        ];

        for (const file of messageFiles) {
          try {
            const fileMessages = (await import(`../../messages/${locale}/${file}.json`)).default;
            messages[file] = fileMessages;
          } catch (fileError) {
            console.log(`Optional message file ${file} not found for locale ${locale}`);
          }
        }
      } catch (dirError) {
        console.error(`Failed to load messages for locale ${locale}:`, dirError);
        // Fallback to English
        messages = (await import(`../../messages/en.json`)).default;
      }
    }
  } catch (e) {
    console.error(`Failed to load any messages:`, e);
    notFound();
  }

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
