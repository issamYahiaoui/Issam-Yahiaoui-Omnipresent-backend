import { CountryModel } from '@/domain/models';

export const GET_COUNTRIES_REPOSITORY = 'GET_COUNTRIES_REPOSITORY';

export interface IGetCountriesRepository {
  getCountries: (data: IGetCountriesRepository.Params) => Promise<IGetCountriesRepository.Result>;
}

export namespace IGetCountriesRepository {
  export type Params = {
    countriesCodes: string[];
  };
  export type Result = Omit<CountryModel, 'id'>[];
}
