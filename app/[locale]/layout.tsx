import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

const locales = ['en', 'cs'];

export default async function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  if (!locales.includes(locale as any)) notFound();

  let messages;
  try {
    // First try to load from the root locale file
    try {
      messages = (await import(`../../../messages/${locale}.json`)).default;
    } catch (rootError) {
      // Then try to load from the locale directory
      messages = (await import(`../../../messages/${locale}/index.json`)).default;
    }
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
