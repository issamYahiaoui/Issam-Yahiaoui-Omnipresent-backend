import { CountryModel } from '@/domain/models';

export const GET_COUNTRIES_SERVICE = 'GET_COUNTRIES_SERVICE';

export interface IGetCountriesService {
  getCountries: (data: IGetCountriesService.Params) => Promise<IGetCountriesService.Result>;
}

export namespace IGetCountriesService {
  export type Params = {
    countriesCodes: string[];
  };

  export type Result = Omit<CountryModel, 'id'>[];
}
