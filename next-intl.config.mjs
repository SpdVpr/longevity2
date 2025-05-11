/** @type {import('next-intl').NextIntlConfig} */
export const locales = ['en', 'cs'];
export const defaultLocale = 'en';

const config = {
  locales,
  defaultLocale,
  localeDetection: true
};

export default config;
