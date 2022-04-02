import { ICountryResourceRepository } from "@/domain/models/contracts/country-resource-repository";
import { CountryModel } from "@/domain/models/country";
import axios from 'axios'

const COUNTRIES_ALL = "https://restcountries.com/v3.1/all"
export class CountryAdapter implements ICountryResourceRepository {
    async findAll(): Promise<CountryModel[]> {
        try {
            const response = await  axios.get(COUNTRIES_ALL)
            const countries: CountryModel[] = response?.data?.map( country => ({
                name: country?.name?.official,
                currencies: country?.currencies,
                languages: country?.languages,
                timezones: country?.timezones
            }))
            return countries
        }catch (e) {
          throw e
        }
    }
    findById: (id: number) => Promise<CountryModel>;
}



