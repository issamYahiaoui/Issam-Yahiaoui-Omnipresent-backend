import {EmployeeModel} from "@/domain/models/employee";

export interface IEmployeeService {
    getEmployees: () => Promise<EmployeeModel[]>;
}
