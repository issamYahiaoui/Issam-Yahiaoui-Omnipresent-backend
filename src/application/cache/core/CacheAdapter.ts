import { CacheClient, CachePayload, CacheResponse } from '@/application/cache/types';

export default interface ICacheAdapter {
  cacheClient: CacheClient;
  get(key: string): Promise<CacheResponse>;

  set(key: string, obj: CachePayload, ttl: number): Promise<boolean>;

  delete(key: string): Promise<void>;

  reset(): Promise<void>;
}
