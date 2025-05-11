import {getRequestConfig} from 'next-intl/server';

// Import from the new config file
const i18nConfig = require('../i18n.config');

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming locale is valid
  if (!i18nConfig.locales.includes(locale as any)) {
    locale = i18nConfig.defaultLocale;
  }

  // Ensure locale is always a string
  const safeLocale = locale || i18nConfig.defaultLocale;

  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}/index.json`)).default,
    timeZone: 'Europe/Prague'
  };
});
