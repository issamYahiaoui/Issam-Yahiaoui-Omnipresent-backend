import { COUNTRIES_REPOSITORY, EMPLOYEES_REPOSITORY, REGION_REPOSITORY } from '@/domain/models';
import {
  CountriesServiceImpl,
  EmployeesServiceImpl,
  COUNTRIES_SERVICE,
  EMPLOYEES_SERVICE,
  RegionServiceImpl,
  REGION_SERVICE,
} from '@/domain/use-cases';
import {
  CountriesRepositoryAdapter,
  EmployeesRepositoryAdapter,
  RegionRepositoryAdapter,
} from '@/infrastructure/driven-adapters/adapters';

export const adapters = [
  {
    provide: COUNTRIES_REPOSITORY,
    useClass: CountriesRepositoryAdapter,
  },
  {
    provide: EMPLOYEES_REPOSITORY,
    useClass: EmployeesRepositoryAdapter,
  },
  {
    provide: REGION_REPOSITORY,
    useClass: RegionRepositoryAdapter,
  },
];

export const services = [
  {
    provide: COUNTRIES_SERVICE,
    useClass: CountriesServiceImpl,
  },
  {
    provide: EMPLOYEES_SERVICE,
    useClass: EmployeesServiceImpl,
  },
  {
    provide: REGION_SERVICE,
    useClass: RegionServiceImpl,
  },
];
