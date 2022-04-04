import {Adapter, Service} from '@tsclean/core';
import {EmployeeModel, GET_EMPLOYEES_REPOSITORY, IGetEmployeesRepository} from '@/domain/models';
import {
    GET_COUNTRIES_SERVICE,
    IGetCountriesService,
    IGetEmployeesService,
    IRegionService,
    REGION_SERVICE
} from '@/domain/use-cases';

@Service()
export class GetEmployeesServiceImpl implements IGetEmployeesService {
    constructor(
        @Adapter(GET_EMPLOYEES_REPOSITORY)
        private readonly getEmployeesRepository: IGetEmployeesRepository,
        @Adapter(GET_COUNTRIES_SERVICE)
        private readonly getCountriesService: IGetCountriesService,
        @Adapter(REGION_SERVICE)
        private readonly regionService: IRegionService,
    ) {
    }

    async getEmployees(): Promise<EmployeeModel[]> {
        const employees = await this.getEmployeesRepository.getEmployees();

        const countriesCodes = employees.map((employee) => employee.country);
        const countries = await this.getCountriesService.getCountries({
            countriesCodes: countriesCodes,
        });

        const regionsNames = countries.map(country => country.region)
        const regionsConfig = await this.regionService.getRegionByNames({
            names: regionsNames
        })

        return this.parseEmployeesResponse(employees, countries, regionsConfig);
    }

    private parseEmployeesResponse(
        employees: IGetEmployeesRepository.Result,
        countries: IGetCountriesService.Result,
        regionsConfig: IRegionService.getRegionByName.Result
    ): IGetEmployeesService.Result {
        let countriesMap = {};
        countries.map((country) => {
            countriesMap[country.code] = country;
        });

        let regionsConfigMap = {};
        regionsConfig.map((regionConfig) => {
            regionsConfigMap[regionConfig.name] = regionConfig;
        });
        return employees.map((employee) => {
            const employeeCountry = countriesMap[employee.country]
            const employeeRegion = regionsConfigMap[employeeCountry.region]
            const hasAdditionalId = employeeRegion?.hasAdditionalId
            return {
                ...employee,
                country: employeeCountry,
                ...(hasAdditionalId && {
                    id: this.getAdditionalId(employee)
                })
            }
        });
    }

    private getAdditionalId(employee: EmployeeModel): any {
        const {firstName, lastName, dateOfBirth} = employee
        return [firstName, lastName, dateOfBirth.split('/').join("")].join("")
    }
}
