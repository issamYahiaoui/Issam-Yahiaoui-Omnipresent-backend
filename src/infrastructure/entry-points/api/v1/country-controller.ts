import { ICountryService } from "@/domain/use-cases/country-service";
import { CountryServiceImpl } from "@/domain/use-cases/impl/country-service-impl";
import {Mapping, Get, Adapter} from "@tsclean/core";

@Mapping('api/v1/countries')
export class CountryController {
    constructor(
        @Adapter(CountryServiceImpl)
        private readonly countryService: ICountryService,
    ) {
    }
    @Get()
    async getCountries(): Promise<any> {
        return this.countryService.getCountries()
    }
}
