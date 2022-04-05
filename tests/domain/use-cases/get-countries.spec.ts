import { CountriesServiceImpl } from '@/domain/use-cases';
import { fakeGetCountriesResponse, CountriesRepositorySpy } from '@/tests/domain/mocks';
import { mockGetCountriesParams } from "@/tests/domain/mocks/common";

type SutTypes = {
  sut: CountriesServiceImpl;
  countriesRepositorySpy: CountriesRepositorySpy;
};
const makeSut = (): SutTypes => {
  const countriesRepositorySpy = new CountriesRepositorySpy();
  const sut = new CountriesServiceImpl(countriesRepositorySpy);
  return { sut, countriesRepositorySpy };
};
describe('Get Countries use case', () => {
  it(`
        GIVEN i am checking success scenario
        WHEN calling countryServiceImpl
        THEN service function should be called with correct values
  `, async function () {
    const { sut, countriesRepositorySpy } = makeSut();
    const getCountriesParams = mockGetCountriesParams()
    await sut.getCountries(getCountriesParams);
    expect(countriesRepositorySpy.params).toEqual({
      countriesCodes: getCountriesParams.countriesCodes
    });
  });

  it(`
        GIVEN i am fetching countries
        WHEN providing countriesCodes
        THEN service function should return fakeGetCountriesResponse
  `, async function () {
    const { sut} = makeSut();
    const getCountriesParams = mockGetCountriesParams()
    const response = await sut.getCountries(getCountriesParams);
    expect(response).toEqual(fakeGetCountriesResponse);
  });

});
