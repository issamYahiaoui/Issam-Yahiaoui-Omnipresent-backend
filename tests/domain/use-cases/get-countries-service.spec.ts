import { GetCountriesServiceImpl } from '@/domain/use-cases';
import { fakeGetCountriesResponse, GetCountriesRepositorySpy } from '@/tests/domain/mocks';

type SutTypes = {
  sut: GetCountriesServiceImpl;
  getCountriesRepositorySpy: GetCountriesRepositorySpy;
};
const makeSut = (): SutTypes => {
  const getCountriesRepositorySpy = new GetCountriesRepositorySpy();
  const sut = new GetCountriesServiceImpl(getCountriesRepositorySpy);
  return { sut, getCountriesRepositorySpy };
};
describe('Get Countries use case', () => {
  it('should return fakeGetCountriesResponse on success', async function () {
    const { sut, getCountriesRepositorySpy } = makeSut();
    const valid = await sut.getCountries({ countriesCodes: [] });
    expect(valid).toEqual(fakeGetCountriesResponse);
  });
});
