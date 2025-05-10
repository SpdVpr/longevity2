import {getRequestConfig} from 'next-intl/server';
import intlConfig from '../next-intl.config';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming locale is valid
  if (!intlConfig.locales.includes(locale as any)) {
    locale = intlConfig.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}/index.json`)).default,
    timeZone: 'Europe/Prague'
  };
});
