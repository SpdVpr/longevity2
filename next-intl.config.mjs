/** @type {import('next-intl').NextIntlConfig} */
const config = {
  defaultLocale: 'en',
  locales: ['en', 'cs'],
  localeDetection: true,
  messages: async (locale) => {
    try {
      return (await import(`./messages/${locale}/index.json`)).default;
    } catch (error) {
      console.error(`Failed to load messages for locale ${locale}:`, error);
      return {};
    }
  }
};

export default config;
