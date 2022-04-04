import { IGetCountriesRepository } from '@/domain/models';

export const fakeGetCountriesResponse = [
  {
    name: 'United Arab Emirates',
    code: 'UAE',
    currencies: [
      {
        name: 'Dirham',
        code: 'AED',
        symbol: 'AED',
      },
    ],
    region: 'Asia',
    languages: ['Arabic'],
    timezones: ['UTC+04'],
  },
];

export class GetCountriesRepositorySpy implements IGetCountriesRepository {
  public result = fakeGetCountriesResponse;

  async getCountries(): Promise<IGetCountriesRepository.Result> {
    return this.result;
  }
}
