import { Mapping, Get, Response } from '@tsclean/core';
import { ok } from "assert";

@Mapping('status')
export class HealthCheck{
  @Get()
  async healthCheck(@Response() res): Promise<any> {
    return ok("Ok")
  }
}
