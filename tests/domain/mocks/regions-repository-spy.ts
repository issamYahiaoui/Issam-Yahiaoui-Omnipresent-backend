import { IRegionRepository } from '@/domain/models';

export const fakeGetRegionsResponse = [
  {
    id: 1,
    name: 'Asia',
    hasAdditionalId: true,
  },
  {
    id: 2,
    name: 'Europe',
    hasAdditionalId: true,
  },
  {
    id: 3,
    name: 'Americas',
    hasAdditionalId: false,
  },
  {
    id: 4,
    name: 'Africa',
    hasAdditionalId: false,
  },
];

export class RegionsRepositorySpy implements IRegionRepository {
   params: IRegionRepository.getRegionByName.Params;
   result = fakeGetRegionsResponse;

  async getRegionByNames(data:IRegionRepository.getRegionByName.Params ): Promise<IRegionRepository.getRegionByName.Result> {
    this.params = data
    return this.result;
  }
}
