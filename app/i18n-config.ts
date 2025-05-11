export const locales = ['en', 'cs'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

// Define path mapping for localized routes
export const pathnames = {
  '/': '/',
  '/about': {
    en: '/about',
    cs: '/o-nas',
  },
  '/fitness': {
    en: '/fitness',
    cs: '/fitness',
  },
  '/nutrition': {
    en: '/nutrition',
    cs: '/vyziva',
  },
  '/mental-health': {
    en: '/mental-health',
    cs: '/dusevni-zdravi',
  },
  '/biomarkers': {
    en: '/biomarkers',
    cs: '/biomarkery',
  },
  '/supplements': {
    en: '/supplements',
    cs: '/doplnky',
  },
  '/contact': {
    en: '/contact',
    cs: '/kontakt',
  },
};

export type AppPathnames = keyof typeof pathnames;
