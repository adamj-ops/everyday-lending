/**
 * Supabase Client Helper
 *
 * Client-side Supabase client for browser usage
 */

import type { Database } from '@/types/supabase';
import { createBrowserClient } from '@supabase/ssr';

// Client-side auth client
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
