// This file is used by the next-intl plugin
const { locales, defaultLocale } = require('./app/config');

/** @type {import('next-intl').NextIntlConfig} */
module.exports = {
  locales,
  defaultLocale,
  localeDetection: true
};
