import {Service} from "@tsclean/core";
import {IEmployeeService} from "@/domain/use-cases/employee-service";
import {EmployeeModel} from "@/domain/models/employee";

@Service()
export class EmployeeServiceImpl implements IEmployeeService {
    constructor() {
    }

    getEmployees(): Promise<EmployeeModel[]> {
        return Promise.resolve([]);
    }
}
