import { CountryModel } from '@/domain/models';

export const COUNTRIES_SERVICE = 'COUNTRIES_SERVICE';



export namespace ICountriesService {
  export type Params = {
    countriesCodes: string[];
  };

  export type Result = Omit<CountryModel, 'id'>[];
}


export interface ICountriesService {
  getCountries: (data: ICountriesService.Params) => Promise<ICountriesService.Result>;
}
