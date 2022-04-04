interface GenericInterface {
  [key: string]: any;
}
export type GenericType = GenericInterface | any;
export type CacheResponse = GenericType | null;
export type CachePayload = GenericType;
export type CacheClient = GenericType;
export interface APIResponse {
  success: boolean;
  error?: string;
  data?: any;
}
