import { NextFunction, Request, Response } from 'express';
import { cacheService } from './CacheFactory';
import logger from "@/application/common/logger";
import * as Config from '@/application/config/environment';
import { APIResponse } from "@/application/cache/types";




export const cache = (time: number) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response<APIResponse> | void> => {
    const { user, query, path } = req;
    const key = user
      ? `express_${user.id}_${path}_${JSON.stringify(query)}`
      : `express_${path}_${JSON.stringify(query)}`;

    const cashedResource = await cacheService.get(key);
    if (cashedResource) {
      res.send(JSON.parse(cashedResource));
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (response: any) => {
        cacheService.set(key, response, time).catch(() => logger.error('Cache write failed'));
        return res.sendResponse(response);
      };
    }
    next();
  };
};

function createCacheKeyPayload(req: Request, skipUser: boolean) {
  const { user, url, language } = req;

  return {
    url: url,
    language: language,
    ...(!skipUser && { userId: user?.id }),
  };
}

export function Cacheable(ttl = Number(Config.API_CACHE_TTL), skipUser = false) {
  function isCacheEnabled() {
    return  Config.ENABLE_API_CACHE;
  }
  return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const originalMethod = descriptor.value;
    const isCacheEnable = isCacheEnabled();
    if (!isCacheEnable) return descriptor;
    return {
      ...descriptor,
      value: async function (...args: any[]) {
        const [req, res, next] = args;
        const keyPayload = createCacheKeyPayload(req, skipUser);
        const key = await cacheService.getKey(keyPayload);
        const cashedResource = await cacheService.get(key);
        if (cashedResource) {
          return res.send(JSON.parse(cashedResource));
        } else {
          res.sendResponse = res.send;
          res.send = (response: any) => {
            const json = JSON.parse(response);
            if (json?.success) cacheService.set(key, response, ttl).catch(() => logger.error('Cache write failed'));
            return res.sendResponse(response);
          };
          await originalMethod.apply(this, [req, res, next]);

        }
      },
    };
  };
}

export function PublicCacheable(ttl = Number(Config.API_CACHE_TTL)) {
  return Cacheable(ttl, true);
}
