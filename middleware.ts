import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Import from the i18n.ts file
import { locales, defaultLocale } from './i18n';

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  // Use the config from i18n.ts
  locales,
  defaultLocale,

  // Always use locale prefix to avoid conflicts
  localePrefix: 'always'
});

// Export a custom middleware function
export default async function middleware(request: NextRequest) {
  // Special handling for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check for protected routes
  const protectedPaths = ['/dashboard', '/dashboard/profile', '/dashboard/bioage-history'];
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.includes(path)
  );

  if (isProtectedPath) {
    const token = await getToken({ req: request });

    // If the user is not authenticated, redirect to the sign-in page
    if (!token) {
      // Get the locale from the URL
      const segments = request.nextUrl.pathname.split('/');
      const locale = segments[1] || 'en';

      // Create the sign-in URL with the current URL as the callbackUrl
      const signInUrl = new URL(`/${locale}/auth/signin`, request.url);
      signInUrl.searchParams.set('callbackUrl', request.url);

      return NextResponse.redirect(signInUrl);
    }
  }

  // For all other routes, use the next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized or authenticated
  matcher: [
    // Internationalization paths
    '/((?!_next|favicon.ico|images|fonts|public).*)',
    // Auth paths
    '/dashboard/:path*',
    '/auth/:path*'
  ]
};
