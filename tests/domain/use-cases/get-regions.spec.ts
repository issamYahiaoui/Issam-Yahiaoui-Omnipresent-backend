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
  it('should call regionsServiceImpl with correct values', async function () {
    const { sut, regionsRepositorySpy } = makeSut();
    const getRegionsByNamesParams = mockGetRegionsByNameParams()
    await sut.getRegionByNames(getRegionsByNamesParams);
    expect(regionsRepositorySpy.params).toEqual({
      names: getRegionsByNamesParams.names
    });
  });

  it('should return  Asia region config when passing name=Asia', async function () {
    const { realSut} = makeSut();
    const getRegionsByNamesParams = mockGetAsiaRegion()
    const response = await realSut.getRegionByNames(getRegionsByNamesParams);
    expect(response).toEqual(AsiaRegionConfig);
  });

});
