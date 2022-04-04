import { CacheResponse } from '@/application/cache/types';
import ICacheAdapter from '@/application/cache/core/CacheAdapter';

export default class CacheService {
  cacheAdapter: ICacheAdapter;
  constructor(cacheManager: ICacheAdapter) {
    this.cacheAdapter = cacheManager;
  }

  async getKey(
    payload: {
      url: string;
      language: string;
      userId?: number;
    },
    prefix = 'express',
  ): Promise<string> {
    const { url, userId, language } = payload;
    return `${prefix}_${[userId, url, language].filter((e) => !!e).join('_')}`;
  }

  async delete(key: string): Promise<void> {
    return this.cacheAdapter.delete(key);
  }

  async get(key: string): Promise<CacheResponse> {
    return this.cacheAdapter.get(key);
  }

  async reset(): Promise<void> {
    return this.cacheAdapter.reset();
  }

  async set(key: string, obj: string, ttl: number): Promise<boolean> {
    return this.cacheAdapter.set(key, obj, ttl);
  }
}
