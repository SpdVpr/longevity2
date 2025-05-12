import {createSharedPathnamesNavigation} from 'next-intl/navigation';

// Define the locales and default locale
export const locales = ['en', 'cs'];
export const defaultLocale = 'en';

// Create the navigation functions
export const {Link, redirect, usePathname, useRouter} = createSharedPathnamesNavigation({
  locales,
  localePrefix: 'always'
});
