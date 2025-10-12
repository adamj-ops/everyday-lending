import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: {
        database: await checkDatabase(),
        redis: await checkRedis(),
        email: await checkEmail(),
        storage: await checkStorage(),
      },
    };

    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

async function checkDatabase(): Promise<{ status: string; message?: string }> {
  try {
    // Check if we have database environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return { status: 'not_configured', message: 'Missing Supabase credentials' };
    }

    // Try to import and check database connection
    const { checkDbHealth } = await import('@/lib/db');
    const isHealthy = await checkDbHealth();

    return {
      status: isHealthy ? 'healthy' : 'unhealthy',
      message: isHealthy ? 'Database connection successful' : 'Database connection failed',
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Database check failed',
    };
  }
}

async function checkRedis(): Promise<{ status: string; message?: string }> {
  try {
    // Check if we have Redis environment variables
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return { status: 'not_configured', message: 'Missing Redis credentials' };
    }

    // Try to import and check Redis connection
    const { CacheService } = await import('@/lib/cache/redis');
    const cache = new CacheService();

    // Test basic Redis operation
    await cache.set('health-check', 'ok', 10);
    const result = await cache.get('health-check');
    await cache.delete('health-check');

    return {
      status: result === 'ok' ? 'healthy' : 'unhealthy',
      message: result === 'ok' ? 'Redis connection successful' : 'Redis operation failed',
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Redis check failed',
    };
  }
}

async function checkEmail(): Promise<{ status: string; message?: string }> {
  try {
    // Check if we have email environment variables
    if (!process.env.RESEND_API_KEY) {
      return { status: 'not_configured', message: 'Missing Resend API key' };
    }

    // Import email service to check configuration
    // const { sendEmail } = await import('@/lib/email/email-service')

    return {
      status: 'healthy',
      message: 'Email service configured (not tested)',
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Email check failed',
    };
  }
}

async function checkStorage(): Promise<{ status: string; message?: string }> {
  try {
    // Check if we have storage environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return { status: 'not_configured', message: 'Missing Supabase credentials' };
    }

    // Import storage service to check configuration
    // const { StorageService } = await import('@/lib/storage/storage-service')
    // const storage = new StorageService()

    return {
      status: 'healthy',
      message: 'Storage service configured (not tested)',
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Storage check failed',
    };
  }
}
