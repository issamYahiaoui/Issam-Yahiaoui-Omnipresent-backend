import { RegionModel } from '@/domain/models';

export const REGION_REPOSITORY = 'REGION_REPOSITORY';

export interface IRegionRepository {
  getRegionByNames: (
    data: IRegionRepository.getRegionByName.Params,
  ) => Promise<IRegionRepository.getRegionByName.Result>;
}

export namespace IRegionRepository {
  export namespace getRegionByName {
    export type Params = {
      names: string[];
    };
    export type Result = RegionModel[];
  }
}
