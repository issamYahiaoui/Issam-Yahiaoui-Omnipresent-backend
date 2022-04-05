import {  RegionServiceImpl } from "@/domain/use-cases";
import {
  AsiaRegionConfig,
  fakeAsiaRegionConfig, mockGetAsiaRegion,
  mockGetRegionsByNameParams
} from "@/tests/domain/mocks/common";
import { RegionsRepositorySpy } from "@/tests/domain/mocks/regions-repository-spy";
import { RegionRepositoryAdapter } from "@/infrastructure/driven-adapters/adapters";

type SutTypes = {
  sut: RegionServiceImpl;
  realSut: RegionServiceImpl;
  regionsRepositorySpy: RegionsRepositorySpy;
  realRegionsRepository: RegionRepositoryAdapter;
};
const makeSut = (): SutTypes => {
  const regionsRepositorySpy = new RegionsRepositorySpy();
  const realRegionsRepository = new RegionRepositoryAdapter();
  const sut = new RegionServiceImpl(regionsRepositorySpy);
  const realSut = new RegionServiceImpl(realRegionsRepository);
  return { sut, regionsRepositorySpy, realRegionsRepository,realSut };
};
describe('Get Regions use case', () => {
  it(`
        GIVEN i am checking success scenario
        WHEN calling getRegionByNames
        THEN service function should be called with correct values
  `, async function () {
    const { sut, regionsRepositorySpy } = makeSut();
    const getRegionsByNamesParams = mockGetRegionsByNameParams()
    await sut.getRegionByNames(getRegionsByNamesParams);
    expect(regionsRepositorySpy.params).toEqual({
      names: getRegionsByNamesParams.names
    });
  });

  it(`
        GIVEN i am fetching countries
        WHEN providing regions names
        THEN service function should return AsiaRegionConfig
  `, async function () {
    const { realSut} = makeSut();
    const getRegionsByNamesParams = mockGetAsiaRegion()
    const response = await realSut.getRegionByNames(getRegionsByNamesParams);
    expect(response).toEqual(AsiaRegionConfig);
  });

});
