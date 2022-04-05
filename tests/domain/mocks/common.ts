import { ICountriesService, IRegionService } from "@/domain/use-cases";


export const mockGetCountriesParams = ():  ICountriesService.Params => ({
  countriesCodes: ["ES", "FR", "DE", "IT", "US"]
})

export const mockGetRegionsByNamesParams = ():  IRegionService.getRegionByName.Params => ({
  names: ["Europe",  "Americas", "Asia", "Africa"]
})


export const EMPLOYEES_COUNTRIES_DATA = {
   FAKE_EMPLOYEES_DATA : [
    {
      firstName: "Roy",
      lastName: "Testerton",
      dateOfBirth: "19/02/1990",
      jobTitle: "Software developer",
      company: "Test co",
      country: "US"
    },
    {
      firstName: "Lisa",
      lastName: "Testora",
      dateOfBirth: "11/07/1984",
      jobTitle: "CTO",
      company: "Test co",
      country: "GBR"
    },
    {
      firstName: "Simon",
      lastName: "McTester",
      dateOfBirth: "01/11/1987",
      jobTitle: "Product manager",
      company: "Mock industries",
      country: "IND"
    }
  ],
   FAKE_EMPLOYEES_RESPONSE: [
    {
      firstName: "Roy",
      lastName: "Testerton",
      dateOfBirth: "19/02/1990",
      jobTitle: "Software developer",
      company: "Test co",
      country: {
        code: "US",
        name: "United States of America",
        currencies: [
          {
            name: "United States dollar",
            code: "USD",
            symbol: "$"
          }
        ],
        languages: [
          "English"
        ],
        timezones: [
          "UTC-12:00",
          "UTC-11:00",
          "UTC-10:00",
          "UTC-09:00",
          "UTC-08:00",
          "UTC-07:00",
          "UTC-06:00",
          "UTC-05:00",
          "UTC-04:00",
          "UTC+10:00",
          "UTC+12:00"
        ],
        region: "Americas"
      }
    },
    {
      firstName: "Lisa",
      lastName: "Testora",
      dateOfBirth: "11/07/1984",
      jobTitle: "CTO",
      company: "Test co",
      country: {
        code: "GBR",
        name: "United Kingdom of Great Britain and Northern Ireland",
        currencies: [
          {
            name: "British pound",
            code: "GBP",
            symbol: "£"
          }
        ],
        languages: [
          "English"
        ],
        timezones: [
          "UTC-08:00",
          "UTC-05:00",
          "UTC-04:00",
          "UTC-03:00",
          "UTC-02:00",
          "UTC",
          "UTC+01:00",
          "UTC+02:00",
          "UTC+06:00"
        ],
        region: "Europe"
      },
      id: "LisaTestora11071984"
    },
    {
      firstName: "Simon",
      lastName: "McTester",
      dateOfBirth: "01/11/1987",
      jobTitle: "Product manager",
      company: "Mock industries",
      country: {
        code: "IND",
        name: "Republic of India",
        currencies: [
          {
            name: "Indian rupee",
            code: "INR",
            symbol: "₹"
          }
        ],
        languages: [
          "English",
          "Hindi",
          "Tamil"
        ],
        timezones: [
          "UTC+05:30"
        ],
        region: "Asia"
      },
      id: "SimonMcTester01111987"
    }
  ]
}


