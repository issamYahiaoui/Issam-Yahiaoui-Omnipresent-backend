import { CountryModel } from '@/domain/models';

export const COUNTRIES_REPOSITORY = 'COUNTRIES_REPOSITORY';

export namespace ICountriesRepository {
  export type Params = {
    countriesCodes: string[];
  };
  export type Result = Omit<CountryModel, 'id'>[];
}

export interface ICountriesRepository {
  getCountries: (data: ICountriesRepository.Params) => Promise<ICountriesRepository.Result>;
}
