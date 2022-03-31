import {Mapping, Get, Adapter} from "@tsclean/core";
import { IEmployeeService } from "@/domain/use-cases/employee-service";
import { EmployeeServiceImpl } from "@/domain/use-cases/impl/employee-service-impl";

@Mapping('api/v1/employees')
export class EmployeeController {
    constructor(
        @Adapter(EmployeeServiceImpl)
        private readonly employeeService: IEmployeeService,
    ) {
    }
    @Get()
    async getEmployees(): Promise<any> {
        return this.employeeService.getEmployees()
    }
}
