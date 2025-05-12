import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { getMessages } from '../i18n';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

const locales = ['en', 'cs'];

export default async function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  // Validate locale
  if (!locales.includes(locale as any)) notFound();

  // Get messages for the current locale
  const messages = await getMessages(locale);

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
