import { ICountriesRepository } from '@/domain/models';

export const fakeGetCountriesResponse = [
  {
    name: 'United States',
    code: 'US',
    currencies: [
      {
        name: 'Dollar',
        code: 'USD',
        symbol: 'USD',
      },
    ],
    region: 'Americas',
    languages: ['English'],
    timezones: ['UTC+08'],
  },
];

export class CountriesRepositorySpy implements ICountriesRepository {
   params: ICountriesRepository.Params;
   result = fakeGetCountriesResponse;

  async getCountries(data:ICountriesRepository.Params ): Promise<ICountriesRepository.Result> {
    this.params = data
    return this.result;
  }
}
