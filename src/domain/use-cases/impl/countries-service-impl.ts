import { Adapter, Service } from '@tsclean/core';
import {
  ICountriesRepository,
  COUNTRIES_REPOSITORY,
} from '@/domain/models';
import { ICountriesService } from '@/domain/use-cases';

@Service()
export class CountriesServiceImpl implements ICountriesService {
  constructor(@Adapter(COUNTRIES_REPOSITORY) private readonly countriesRepository: ICountriesRepository) {}

  async getCountries(data: ICountriesService.Params): Promise<ICountriesService.Result> {
    return this.countriesRepository.getCountries(data);
  }
}
