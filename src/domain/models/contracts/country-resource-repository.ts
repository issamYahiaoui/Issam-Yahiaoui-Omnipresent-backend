import { CountryModel} from "@/domain/models/country";
export const COUNTRY_RESOURCE_REPOSITORY = "COUNTRY_RESOURCE_REPOSITORY";

export interface ICountryResourceRepository {
    findAll: () => Promise<CountryModel[]>;
    findById: (id: number) => Promise<CountryModel>;
}
