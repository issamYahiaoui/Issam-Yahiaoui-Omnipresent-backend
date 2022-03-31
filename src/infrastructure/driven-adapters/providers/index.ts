import {EmployeeServiceImpl} from "@/domain/use-cases/impl/employee-service-impl";
import { EmployeeMysqlRepositoryAdapter } from "../adapters/orm/sequelize/employee-mysql-repository-adapter";

export const adapters = [EmployeeMysqlRepositoryAdapter];

export const services = [EmployeeServiceImpl];
