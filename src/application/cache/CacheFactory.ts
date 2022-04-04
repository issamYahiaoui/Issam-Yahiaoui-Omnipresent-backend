import LRUCacheAdapter from '@/application/common/cache/adapters/LRUCacheAdapter';
import CacheService from '@/application/common/cache/core/CacheService';
import RedisCacheAdapter from '@/application/common/cache/adapters/RedisCacheAdapter';
import * as Config from '@/application/config/environment';


const apiCacheClient = Config.API_CACHE_CLIENT;

const API_CACHE_CLIENTS = {
  REDIS: 'redis',
  LRU: 'lru',
};

const cacheService = {
  [API_CACHE_CLIENTS.LRU]: new CacheService(new LRUCacheAdapter()),
  [API_CACHE_CLIENTS.REDIS]: new CacheService(new RedisCacheAdapter()),
}[apiCacheClient];

export { cacheService };
