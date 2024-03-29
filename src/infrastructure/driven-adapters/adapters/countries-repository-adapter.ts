import logger from '@/application/common/logger';
import {  ICountriesRepository } from '@/domain/models';
import axios from 'axios';
import { COUNTRIES_SERVICE_URL } from "@/application/config/environment";


export class CountriesRepositoryAdapter implements ICountriesRepository {
  async getCountries(data: ICountriesRepository.Params): Promise<ICountriesRepository.Result> {
    const { countriesCodes } = data;
    try {
      const response = await axios.get(`${COUNTRIES_SERVICE_URL}?codes=${countriesCodes.join(',')}`);
      return this.parseCountriesResult(response.data , countriesCodes);
    } catch (e) {
      logger.info(e);
      // in case of any error from Countries Service we should return empty response []
      return []
    }
  }

  private parseCountriesResult(data: any, countriesCodes: string[]): Promise<ICountriesRepository.Result> {
    return data.map((countryData) => {
      const currencies = Object.entries(countryData.currencies).map(
        ([key, value]: [key: string, value: { name: string; symbol: string }]) => ({
          name: value.name,
          code: key,
          symbol: value.symbol,
        }),
      );
      const languages = Object.values(countryData.languages).map(String);
      const timezones = countryData.timezones.map(String);
      const codes = [countryData.cca2, countryData.ccn3, countryData.cca3, countryData.cioc];
      return {
        code: this.parseCountryCode(countriesCodes, codes),
        name: countryData.name.official || countryData.name.common,
        currencies,
        languages,
        timezones,
        region: countryData.region,
      };
    });
  }

  private parseCountryCode(countriesCodes: string[], codes: any[]) {
    const filteredCodes = countriesCodes.filter((code) => codes.includes(code));
    return filteredCodes?.length ? filteredCodes[0] : '';
  }
}
