import { Mapping, Get, Adapter } from '@tsclean/core';
import { GET_COUNTRIES_SERVICE, IGetCountriesService } from '@/domain/use-cases';

@Mapping('api/v1/countries')
export class GetCountriesController {
  constructor(
    @Adapter(GET_COUNTRIES_SERVICE)
    private readonly countriesService: IGetCountriesService,
  ) {}

  @Get()
  async getCountries(data: GetCountriesController.Request): Promise<any> {
    return this.countriesService.getCountries(data);
  }
}

namespace GetCountriesController {
  export type Request = IGetCountriesService.Params;
  export type Response = IGetCountriesService.Result;
}
