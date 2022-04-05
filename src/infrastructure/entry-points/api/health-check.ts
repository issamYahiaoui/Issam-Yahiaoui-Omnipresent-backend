import { Mapping, Get, Response } from '@tsclean/core';

@Mapping('status')
export class HealthCheck{
  @Get()
  async healthCheck(@Response() res): Promise<any> {
    return res.status(200).end()
  }
}
