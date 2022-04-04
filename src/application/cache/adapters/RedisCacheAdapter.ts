import ICacheAdapter from '@/application/cache/core/CacheAdapter';
import { CacheClient, CachePayload, CacheResponse } from '@/application/cache/types';

export default class RedisCacheAdapter implements ICacheAdapter {
  cacheClient: CacheClient;
  getAsync: Function;

  constructor(cacheClient?: CacheClient, getAsync?: Function) {
    this.cacheClient = cacheClient;
    this.getAsync = getAsync
  }

  async delete(key: string): Promise<void> {
    await this.cacheClient.del(key);
  }

  async get(key: string): Promise<CacheResponse> {
    return this.getAsync(key);
  }

  async reset(): Promise<void> {
    await this.cacheClient.flushall();
  }

  async set(key: string, obj: CachePayload, ttl: number): Promise<boolean> {
    if (typeof obj !== 'string' && !(obj instanceof String)) {
      obj = JSON.stringify(obj);
    }
    return this.cacheClient.set(key, obj, 'PX', ~~ttl);
  }
}
