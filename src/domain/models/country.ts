export type Currency = {
  name: string;
  code: string;
  symbol: string;
};

export type CountryModel = {
  id: number;
  code: string;
  name: string;
  region: string;
  currencies: Currency[];
  languages: string[];
  timezones: string[];
};


