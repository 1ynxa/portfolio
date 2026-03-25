import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './src/i18n/config';

const handleI18n = createMiddleware({
  locales,
  defaultLocale,
});

export function proxy(request: NextRequest) {
  return handleI18n(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
