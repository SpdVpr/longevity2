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
    // Load all message files for the locale
    const indexMessages = (await import(`../../messages/${locale}/index.json`)).default;
    const aboutMessages = (await import(`../../messages/${locale}/about.json`)).default;
    const toolsMessages = (await import(`../../messages/${locale}/tools.json`)).default;
    const dashboardMessages = (await import(`../../messages/${locale}/dashboard.json`)).default;
    const mentalHealthMessages = (await import(`../../messages/${locale}/mental-health.json`)).default;
    
    messages = {
      ...indexMessages,
      about: aboutMessages,
      tools: toolsMessages,
      dashboard: dashboardMessages,
      mentalHealth: mentalHealthMessages
    };
  } catch (e) {
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
