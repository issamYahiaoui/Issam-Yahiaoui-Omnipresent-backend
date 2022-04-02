import {Adapter, Service} from "@tsclean/core";
import {ICountryService} from "@/domain/use-cases/country-service";
import { CountryModel } from "@/domain/models/country";
import { ICountryResourceRepository } from "@/domain/models/contracts/country-resource-repository";
import { CountryAdapter } from "@/infrastructure/driven-adapters/adapters/country-adapter";

@Service()
export class CountryServiceImpl implements ICountryService {
    constructor(
        @Adapter(CountryAdapter)
        private readonly countryRepository: ICountryResourceRepository
    ) {
    }
    async getCountries(): Promise<CountryModel[]> {
        return this.countryRepository.findAll()
    }
}
