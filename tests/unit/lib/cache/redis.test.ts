/**
 * Redis Cache Service Unit Tests
 *
 * Tests the caching layer using Upstash Redis
 * Uses Vitest for unit testing with mocked Redis client
 */

import { describe, expect, it, vi } from 'vitest';

import { CacheService } from '@/lib/cache/redis';

// Mock @upstash/redis module
vi.mock('@upstash/redis', () => ({
  Redis: vi.fn().mockImplementation(() => ({
    get: vi.fn(),
    set: vi.fn(),
    setex: vi.fn(),
    del: vi.fn(),
    exists: vi.fn(),
    mget: vi.fn(),
    mset: vi.fn(),
    incrby: vi.fn(),
    expire: vi.fn(),
    ttl: vi.fn(),
    flushall: vi.fn(),
  })),
}));

describe('CacheService', () => {
  it('should be defined', () => {
    expect(CacheService).toBeDefined();
  });

  it('should create instance without errors', () => {
    expect(() => new CacheService()).not.toThrow();
  });

  it('should have all required methods', () => {
    const cacheService = new CacheService();

    expect(typeof cacheService.get).toBe('function');
    expect(typeof cacheService.set).toBe('function');
    expect(typeof cacheService.delete).toBe('function');
    expect(typeof cacheService.exists).toBe('function');
    expect(typeof cacheService.mget).toBe('function');
    expect(typeof cacheService.mset).toBe('function');
    expect(typeof cacheService.incr).toBe('function');
    expect(typeof cacheService.expire).toBe('function');
    expect(typeof cacheService.ttl).toBe('function');
    expect(typeof cacheService.flushall).toBe('function');
  });

  it('should handle missing environment variables gracefully', () => {
    // Test that the service can be instantiated even without Redis credentials
    const originalEnv = process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_URL;

    expect(() => new CacheService()).not.toThrow();

    // Restore environment
    if (originalEnv) {
      process.env.UPSTASH_REDIS_REST_URL = originalEnv;
    }
  });
});
