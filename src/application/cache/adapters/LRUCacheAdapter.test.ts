
import LRUCacheAdapter from './LRUCacheAdapter';
describe('LRU Cache adapter should implement all caching contract', () => {
  it('should set value properly', async () => {
    const lruCacheAdapter = new LRUCacheAdapter();
    const value = { SomeKey: 'SomeValue' };
    const key = 'TestKey';
    await lruCacheAdapter.set(key, value, 100);
    const newVal = await lruCacheAdapter.get(key);
    expect(newVal).toEqual(value);
  });
  it('should reset all values properly', async () => {
    const lruCacheAdapter = new LRUCacheAdapter();
    const value = { SomeKey: 'SomeValue' };
    const key = 'TestKey';
    await lruCacheAdapter.set(key, value, 100);
    await lruCacheAdapter.reset();
    const newVal = await lruCacheAdapter.get(key);
    expect(newVal).toBeNull();
  });
  it('should delete a value properly', async () => {
    const lruCacheAdapter = new LRUCacheAdapter();
    const value = { SomeKey: 'SomeValue' };
    const key = 'TestKey';
    await lruCacheAdapter.set(key, value, 100);
    await lruCacheAdapter.delete(key);
    const newVal = await lruCacheAdapter.get(key);
    expect(newVal).toBeNull();
  });
});
