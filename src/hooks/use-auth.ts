/**
 * Authentication Hooks
 *
 * Hooks for client-side authentication with Supabase
 */

'use client';

import type { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-client';

/**
 * Hook to get current authenticated user
 *
 * @example
 * ```tsx
 * const { user, loading } = useAuth();
 * ```
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
