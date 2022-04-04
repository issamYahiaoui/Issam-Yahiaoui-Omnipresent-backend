import { RegionModel } from '@/domain/models';

export const REGION_SERVICE = 'REGION_SERVICE';

export interface IRegionService {
  getRegionByNames: (data: IRegionService.getRegionByName.Params) => Promise<IRegionService.getRegionByName.Result>;
}

// eslint-disable-next-line no-redeclare
export namespace IRegionService {
  export namespace getRegionByName {
    export type Params = {
      names: string[];
    };
    export type Result = RegionModel[];
  }
}
