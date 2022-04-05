import { CountriesServiceImpl } from '@/domain/use-cases';
import { fakeGetCountriesResponse, CountriesRepositorySpy } from '@/tests/domain/mocks';
import { mockGetCountriesParams, mockInvalidGetCountriesParams } from "@/tests/domain/mocks/common";

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
  it('should call countryServiceImpl with correct values', async function () {
    const { sut, countriesRepositorySpy } = makeSut();
    const getCountriesParams = mockGetCountriesParams()
    await sut.getCountries(getCountriesParams);
    expect(countriesRepositorySpy.params).toEqual({
      countriesCodes: getCountriesParams.countriesCodes
    });
  });

  it('should return  fakeGetCountriesResponse on success', async function () {
    const { sut} = makeSut();
    const getCountriesParams = mockGetCountriesParams()
    const response = await sut.getCountries(getCountriesParams);
    expect(response).toEqual(fakeGetCountriesResponse);
  });

});
