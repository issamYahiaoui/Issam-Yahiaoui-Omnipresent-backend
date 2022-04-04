import { Adapter, Service } from '@tsclean/core';
import { IRegionService } from '@/domain/use-cases';
import { REGION_REPOSITORY, IRegionRepository } from '@/domain/models';

@Service()
export class RegionServiceImpl implements IRegionService {
  constructor(
    @Adapter(REGION_REPOSITORY)
    private readonly regionRepository: IRegionRepository,
  ) {}

  async getRegionByNames(data: IRegionService.getRegionByName.Params): Promise<IRegionService.getRegionByName.Result> {
    return this.regionRepository.getRegionByNames(data);
  }
}
