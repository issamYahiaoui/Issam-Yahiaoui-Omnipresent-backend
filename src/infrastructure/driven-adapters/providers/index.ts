import { GET_COUNTRIES_REPOSITORY, GET_EMPLOYEES_REPOSITORY, REGION_REPOSITORY } from '@/domain/models';
import {
  GetCountriesServiceImpl,
  GetEmployeesServiceImpl,
  GET_COUNTRIES_SERVICE,
  GET_EMPLOYEES_SERVICE,
  RegionServiceImpl,
  REGION_SERVICE,
} from '@/domain/use-cases';
import {
  GetCountriesRepositoryAdapter,
  GetEmployeesRepositoryAdapter,
  RegionRepositoryAdapter,
} from '@/infrastructure/driven-adapters/adapters';

export const adapters = [
  {
    provide: GET_COUNTRIES_REPOSITORY,
    useClass: GetCountriesRepositoryAdapter,
  },
  {
    provide: GET_EMPLOYEES_REPOSITORY,
    useClass: GetEmployeesRepositoryAdapter,
  },
  {
    provide: REGION_REPOSITORY,
    useClass: RegionRepositoryAdapter,
  },
];

export const services = [
  {
    provide: GET_COUNTRIES_SERVICE,
    useClass: GetCountriesServiceImpl,
  },
  {
    provide: GET_EMPLOYEES_SERVICE,
    useClass: GetEmployeesServiceImpl,
  },
  {
    provide: REGION_SERVICE,
    useClass: RegionServiceImpl,
  },
];
