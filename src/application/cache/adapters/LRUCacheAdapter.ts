import LRU from 'lru-cache';
import ICacheAdapter from '@/application/cache/core/CacheAdapter';
import { CacheClient, CacheResponse } from '@/application/cache/types';

export default class LRUCacheAdapter implements ICacheAdapter {
  cacheClient: CacheClient;
  constructor() {
    this.cacheClient = new LRU({
      max: 250_000_000, // 250MB
      length: function (n: any, key: string) {
        return n.length;
      },
      maxAge: 24 * 3600 * 1000,
    });
  }

  async delete(key: string): Promise<void> {
    return this.cacheClient.del(key);
  }

  async get(key: string): Promise<CacheResponse> {
    const result = await this.cacheClient.get(key);
    return result || null;
  }

  async reset(): Promise<void> {
    return this.cacheClient.reset();
  }

  async set(key: string, obj: object, ttl: number): Promise<boolean> {
    return this.cacheClient.set(key, obj, ttl);
  }
}
