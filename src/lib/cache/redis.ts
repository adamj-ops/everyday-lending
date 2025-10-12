/**
 * Redis Cache Client
 * 
 * Provides caching layer using Upstash Redis
 * Used for session storage, API response caching, and temporary data
 * 
 * Architecture: Enhanced Modular Monolith Service Layer
 * Dependencies: @upstash/redis
 */

import { Redis } from '@upstash/redis'

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export class CacheService {
  private client: Redis

  constructor() {
    this.client = redis
  }

  /**
   * Get value from cache
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key)
      return value as T | null
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  /**
   * Set value in cache with optional TTL
   */
  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<boolean> {
    try {
      if (ttlSeconds) {
        await this.client.setex(key, ttlSeconds, JSON.stringify(value))
      } else {
        await this.client.set(key, JSON.stringify(value))
      }
      return true
    } catch (error) {
      console.error('Cache set error:', error)
      return false
    }
  }

  /**
   * Delete value from cache
   */
  async delete(key: string): Promise<boolean> {
    try {
      await this.client.del(key)
      return true
    } catch (error) {
      console.error('Cache delete error:', error)
      return false
    }
  }

  /**
   * Check if key exists in cache
   */
  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.client.exists(key)
      return result === 1
    } catch (error) {
      console.error('Cache exists error:', error)
      return false
    }
  }

  /**
   * Get multiple values from cache
   */
  async mget<T>(keys: string[]): Promise<(T | null)[]> {
    try {
      const values = await this.client.mget(...keys)
      return values.map(v => v ? JSON.parse(v as string) : null)
    } catch (error) {
      console.error('Cache mget error:', error)
      return keys.map(() => null)
    }
  }

  /**
   * Set multiple values in cache
   */
  async mset<T>(keyValuePairs: Record<string, T>): Promise<boolean> {
    try {
      const serialized = Object.entries(keyValuePairs).reduce((acc, [key, value]) => {
        acc[key] = JSON.stringify(value)
        return acc
      }, {} as Record<string, string>)
      
      await this.client.mset(serialized)
      return true
    } catch (error) {
      console.error('Cache mset error:', error)
      return false
    }
  }

  /**
   * Increment a numeric value in cache
   */
  async incr(key: string, increment: number = 1): Promise<number> {
    try {
      return await this.client.incrby(key, increment)
    } catch (error) {
      console.error('Cache incr error:', error)
      return 0
    }
  }

  /**
   * Set expiration on existing key
   */
  async expire(key: string, seconds: number): Promise<boolean> {
    try {
      const result = await this.client.expire(key, seconds)
      return result === 1
    } catch (error) {
      console.error('Cache expire error:', error)
      return false
    }
  }

  /**
   * Get TTL for a key
   */
  async ttl(key: string): Promise<number> {
    try {
      return await this.client.ttl(key)
    } catch (error) {
      console.error('Cache ttl error:', error)
      return -1
    }
  }

  /**
   * Clear all cache (use with caution)
   */
  async flushall(): Promise<boolean> {
    try {
      await this.client.flushall()
      return true
    } catch (error) {
      console.error('Cache flushall error:', error)
      return false
    }
  }
}

// Export singleton instance
export const cacheService = new CacheService()

// Cache key generators
export const CacheKeys = {
  loan: (id: string) => `loan:${id}`,
  borrower: (id: string) => `borrower:${id}`,
  lender: (id: string) => `lender:${id}`,
  property: (id: string) => `property:${id}`,
  payment: (id: string) => `payment:${id}`,
  draw: (id: string) => `draw:${id}`,
  user: (id: string) => `user:${id}`,
  session: (id: string) => `session:${id}`,
  api: (endpoint: string, params: string) => `api:${endpoint}:${params}`,
} as const
