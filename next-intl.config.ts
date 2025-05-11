export const locales = ['en', 'cs'];
export const defaultLocale = 'en';

export type Locale = (typeof locales)[number];

export default {
  locales,
  defaultLocale,
  localeDetection: true
};
