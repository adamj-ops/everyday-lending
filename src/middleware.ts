import type { NextFetchEvent, NextRequest } from 'next/server';
import { detectBot } from '@arcjet/next';
import { createServerClient } from '@supabase/ssr';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import arcjet from '@/libs/Arcjet';
import { routing } from './libs/I18nRouting';

const handleI18nRouting = createMiddleware(routing);

const protectedRoutes = ['/dashboard'];
const authRoutes = ['/sign-in', '/sign-up'];

// Improve security with Arcjet
const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    // Block all bots except the following
    allow: [
      // See https://docs.arcjet.com/bot-protection/identifying-bots
      'CATEGORY:SEARCH_ENGINE', // Allow search engines
      'CATEGORY:PREVIEW', // Allow preview links to show OG images
      'CATEGORY:MONITOR', // Allow uptime monitoring services
    ],
  }),
);

export default async function middleware(
  request: NextRequest,
  _event: NextFetchEvent,
) {
  // Verify the request with Arcjet
  // Use `process.env` instead of Env to reduce bundle size in middleware
  const arcjetKey = process.env.ARCJET_KEY;
  const hasValidArcjetKey = arcjetKey
    && arcjetKey !== 'ajkey_demo_key_for_development'
    && arcjetKey.startsWith('ajkey_');

  if (hasValidArcjetKey) {
    const decision = await aj.protect(request);

    if (decision.isDenied()) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  // Check if Supabase is properly configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const hasValidSupabaseConfig = supabaseUrl && supabaseAnonKey;

  if (hasValidSupabaseConfig) {
    let response = NextResponse.next({ request });

    // Create Supabase client
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    // Get user session
    const { data: { user } } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;
    const locale = pathname.match(/^\/([^/]+)/)?.[1] || '';
    
    // Check if route is protected
    const isProtected = protectedRoutes.some(route => 
      pathname.includes(route)
    );
    
    const isAuthPage = authRoutes.some(route => 
      pathname.includes(route)
    );

    // Redirect to sign-in if accessing protected route without auth
    if (isProtected && !user) {
      const signInUrl = new URL(`/${locale}/sign-in`, request.url);
      return NextResponse.redirect(signInUrl);
    }

    // Redirect to dashboard if accessing auth pages while authenticated
    if (isAuthPage && user) {
      const dashboardUrl = new URL(`/${locale}/dashboard`, request.url);
      return NextResponse.redirect(dashboardUrl);
    }

    // Apply i18n routing
    return handleI18nRouting(request);
  }

  return handleI18nRouting(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/_next`, `/_vercel` or `monitoring`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // - … API health endpoints
  matcher: '/((?!_next|_vercel|monitoring|api/health|.*\\..*).*)',
  runtime: 'nodejs',
};
