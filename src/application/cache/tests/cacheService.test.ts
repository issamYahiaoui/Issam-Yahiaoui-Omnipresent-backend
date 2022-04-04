import { cacheService } from '../CacheFactory';

describe('CacheService Testing', () => {
  describe('LRUCacheAdapter Testing', () => {
    const payload = {
      key: 'value',
    };

    it('should return cached payload', async (done) => {
      const key = String(Math.random());
      let response = await cacheService.get(key);
      expect(response).toBeFalsy();
      await cacheService.set(key, JSON.stringify(payload), 1000);
      response = await cacheService.get(key);
      expect(JSON.parse(response)).toMatchObject(payload);
      done();
    });

    it('should delete cached payload', async (done) => {
      const key = String(Math.random());
      await cacheService.set(key, JSON.stringify(payload), 5000);
      let response = await cacheService.get(key);
      expect(JSON.parse(response)).toMatchObject(payload);
      await cacheService.delete(key);
      response = await cacheService.get(key);
      expect(response).toBeFalsy();
      done();
    });

    it('should delete cached payload once ttl is expired', async (done) => {
      const key = String(Math.random());
      await cacheService.set(key, JSON.stringify(payload), 1000);
      let response = await cacheService.get(key);
      expect(JSON.parse(response)).toMatchObject(payload);
      response = await new Promise((resolve) => {
        setTimeout(async () => {
          const result = await cacheService.get(key);
          resolve(result);
        }, 2000);
      });
      expect(response).toBeFalsy();

      done();
    });

    afterEach(() => {
      cacheService.reset();
    });
    afterAll(() => {
      cacheService.reset();
    });
  });
});
