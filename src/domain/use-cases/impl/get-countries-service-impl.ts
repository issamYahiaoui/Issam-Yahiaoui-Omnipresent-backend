import { Adapter, Service } from '@tsclean/core';
import {
  IGetCountriesRepository,
  GET_COUNTRIES_REPOSITORY,
} from '@/domain/models';
import { IGetCountriesService } from '@/domain/use-cases';

@Service()
export class GetCountriesServiceImpl implements IGetCountriesService {
  constructor(@Adapter(GET_COUNTRIES_REPOSITORY) private readonly getCountriesRepository: IGetCountriesRepository) {}

  async getCountries(data: IGetCountriesService.Params): Promise<IGetCountriesService.Result> {
    return await this.getCountriesRepository.getCountries(data);
  }
}
