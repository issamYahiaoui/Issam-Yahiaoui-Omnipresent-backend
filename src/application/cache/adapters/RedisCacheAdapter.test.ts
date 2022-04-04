import RedisCache from './RedisCacheAdapter';

describe('LRU Cache adapter should implement all caching contract', () => {
  beforeEach(async () => await new RedisCache().reset());
  it('should set value properly', async () => {
    const cacheAdapter = new RedisCache();
    const value = JSON.stringify({ SomeKey: 'SomeValue' });
    const key = 'TestKey';

    await cacheAdapter.set(key, value, 1000);
    const newVal = await cacheAdapter.get(key);
    expect(newVal).toEqual(value);
  });
  it('should reset all values properly', async () => {
    const lruCacheAdapter = new RedisCache();
    const value = { SomeKey: 'SomeValue' };
    const key = 'TestKey';
    await lruCacheAdapter.set(key, value, 100);
    await lruCacheAdapter.reset();
    const newVal = await lruCacheAdapter.get(key);
    expect(newVal).toBeNull();
  });
  it('should delete a value properly', async () => {
    const lruCacheAdapter = new RedisCache();
    const value = { SomeKey: 'SomeValue' };
    const key = 'TestKey';
    await lruCacheAdapter.set(key, value, 100);
    await lruCacheAdapter.delete(key);
    const newVal = await lruCacheAdapter.get(key);
    expect(newVal).toBeNull();
  });
});
