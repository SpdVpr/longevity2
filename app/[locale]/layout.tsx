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
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
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
