import { CountryModel } from "../models/country";

export interface ICountryService {
    getCountries: () => Promise<CountryModel[]>;
}
