import { CountryServiceImpl } from "@/domain/use-cases/impl/country-service-impl";
import {EmployeeServiceImpl} from "@/domain/use-cases/impl/employee-service-impl";
import { CountryAdapter } from "../adapters/country-adapter";
import { EmployeeMysqlRepositoryAdapter } from "../adapters/orm/sequelize/employee-mysql-repository-adapter";

export const adapters = [EmployeeMysqlRepositoryAdapter, CountryAdapter];

export const services = [EmployeeServiceImpl, CountryServiceImpl];
