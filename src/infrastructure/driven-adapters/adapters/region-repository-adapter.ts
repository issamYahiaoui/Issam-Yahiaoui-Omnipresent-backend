import {  IRegionRepository } from '@/domain/models';

const REGION_DATA = [
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

// TODO: Replace this with a DB ORM Adapter in the future
export class RegionRepositoryAdapter implements IRegionRepository {
  async getRegionByNames(
    data: IRegionRepository.getRegionByName.Params,
  ): Promise<IRegionRepository.getRegionByName.Result> {
    const { names } = data;
    const regionConfig = REGION_DATA.filter((region) => names.includes(region.name));
    return Promise.resolve(regionConfig);
  }
}
