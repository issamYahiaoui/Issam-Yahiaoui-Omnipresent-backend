import {Adapter, Service} from "@tsclean/core";
import {IEmployeeService} from "@/domain/use-cases/employee-service";
import {EmployeeModel} from "@/domain/models/employee";
import { IEmployeeResourceRepository } from "@/domain/models/contracts/employee-resource-repository";
import { EmployeeMysqlRepositoryAdapter } from "@/infrastructure/driven-adapters/adapters/orm/sequelize/employee-mysql-repository-adapter";

@Service()
export class EmployeeServiceImpl implements IEmployeeService {
    constructor(
        @Adapter(EmployeeMysqlRepositoryAdapter)
        private readonly employeeRepository: IEmployeeResourceRepository
    ) {
    }

    getEmployees(): Promise<EmployeeModel[]> {
        return this.employeeRepository.findAll()
    }
}
