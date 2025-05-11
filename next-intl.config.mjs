// This file is used by the next-intl plugin in next.config.mjs
import { notFound } from 'next/navigation';

// Get the supported locales from i18n.config.js
const i18nConfig = require('./i18n.config');

export const locales = i18nConfig.locales;
export const defaultLocale = i18nConfig.defaultLocale;

// Use the same config for the plugin
export default {
  locales,
  defaultLocale,
  localeDetection: true
};

// Create a function to handle locale not found
export function getLocalePartsFrom({ pathname, locale }) {
  if (!locale) return [pathname, undefined];
  
  const segments = pathname.split('/');
  segments[1] = locale;
  
  return [segments.join('/'), locale];
}

// Create a function to handle locale not found
export function localePrefix(locale) {
  return locale === defaultLocale ? '' : `/${locale}`;
}

// Create a function to handle locale not found
export function checkLocale(locale) {
  if (!locales.includes(locale)) notFound();
}
