import { Adapter, Service } from '@tsclean/core';
import { EmployeeModel, EMPLOYEES_REPOSITORY, IEmployeesRepository } from '@/domain/models';
import {
  COUNTRIES_SERVICE,
  ICountriesService,
  IEmployeesService,
  IRegionService,
  REGION_SERVICE,
} from '@/domain/use-cases';

@Service()
export class EmployeesServiceImpl implements IEmployeesService {
  constructor(
    @Adapter(EMPLOYEES_REPOSITORY)
    private readonly getEmployeesRepository: IEmployeesRepository,
    @Adapter(COUNTRIES_SERVICE)
    private readonly getCountriesService: ICountriesService,
    @Adapter(REGION_SERVICE)
    private readonly regionService: IRegionService,
  ) {}

  async getEmployees(): Promise<EmployeeModel[]> {
    const employees = await this.getEmployeesRepository.getEmployees();

    const countriesCodes = employees.map((employee) => employee.country);
    const countries = await this.getCountriesService.getCountries({
      countriesCodes: countriesCodes,
    });

    const regionsNames = countries.map((country) => country.region);
    const regionsConfig = await this.regionService.getRegionByNames({
      names: regionsNames,
    });

    return this.parseEmployeesResponse(employees, countries, regionsConfig);
  }

  private parseEmployeesResponse(
    employees: IEmployeesRepository.Result,
    countries: ICountriesService.Result,
    regionsConfig: IRegionService.getRegionByName.Result,
  ): IEmployeesService.Result {
    const countriesMap = {};
    countries.map((country) => {
      countriesMap[country.code] = country;
    });

    const regionsConfigMap = {};
    regionsConfig.map((regionConfig) => {
      regionsConfigMap[regionConfig.name] = regionConfig;
    });
    return employees.map((employee) => {
      const employeeCountry = countriesMap[employee.country];
      const employeeRegion = regionsConfigMap[employeeCountry.region];
      const hasAdditionalId = employeeRegion?.hasAdditionalId;
      return {
        ...employee,
        country: employeeCountry,
        ...(hasAdditionalId && {
          id: EmployeesServiceImpl.getAdditionalId(employee),
        }),
      };
    });
  }

  private static getAdditionalId(employee: EmployeeModel): any {
    const { firstName, lastName, dateOfBirth } = employee;
    return [firstName, lastName, dateOfBirth.split('/').join('')].join('');
  }
}
