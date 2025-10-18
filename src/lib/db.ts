/**
 * Database Connection and Configuration
 *
 * Provides Supabase client for database operations
 * Replaces existing PGlite setup with Supabase for production
 *
 * Architecture: Enhanced Modular Monolith Service Layer
 * Dependencies: @supabase/supabase-js
 */

import type { Database } from '@/types/supabase';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,      // Enable session persistence
    autoRefreshToken: true,    // Enable token refresh
    detectSessionInUrl: true,  // Enable OAuth redirects
  },
  realtime: {
    // Enable realtime for live updates
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Health check function
export async function checkDbHealth(): Promise<boolean> {
  try {
    const { error } = await supabase.from('borrowers').select('id').limit(1);
    return !error;
  } catch {
    return false;
  }
}

// Server-side client for API routes
export const createServerClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseServiceKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
};

// Database utility functions
export class DatabaseService {
  private client: ReturnType<typeof createClient<Database>>;

  constructor(client: ReturnType<typeof createClient<Database>>) {
    this.client = client;
  }

  /**
   * Test database connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const { error } = await this.client
        .from('borrowers')
        .select('count')
        .limit(1);

      return !error;
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
  }

  /**
   * Get database health status
   */
  async getHealthStatus(): Promise<{
    connected: boolean;
    latency: number;
    error?: string;
  }> {
    const start = Date.now();

    try {
      const { error } = await this.client
        .from('borrowers')
        .select('id')
        .limit(1);

      const latency = Date.now() - start;

      return {
        connected: !error,
        latency,
        error: error?.message,
      };
    } catch (error) {
      return {
        connected: false,
        latency: Date.now() - start,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Execute raw SQL query (use with caution)
   * Note: This function is disabled as execute_sql RPC doesn't exist
   */
  async executeRawQuery(_query: string): Promise<any> {
    throw new Error('Raw SQL execution is not available in this Supabase setup');
  }

  /**
   * Get table statistics
   */
  async getTableStats(): Promise<Record<string, number>> {
    try {
      const tables = ['borrowers', 'lenders', 'loans', 'properties', 'payments', 'rehab_draws'];
      const stats: Record<string, number> = {};

      for (const table of tables) {
        const { count, error } = await this.client
          .from(table as keyof Database['public']['Tables'])
          .select('*', { count: 'exact', head: true });

        if (error) {
          console.error(`Error counting ${table}:`, error);
          stats[table] = 0;
        } else {
          stats[table] = count || 0;
        }
      }

      return stats;
    } catch (error) {
      console.error('Failed to get table stats:', error);
      return {};
    }
  }
}

// Export singleton instances
export const dbService = new DatabaseService(supabase);
export const serverDbService = new DatabaseService(createServerClient());

// Database connection status
export const isDatabaseConnected = async (): Promise<boolean> => {
  return await dbService.testConnection();
};

// Export types for use in other modules
export type { Database } from '@/types/supabase';
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
