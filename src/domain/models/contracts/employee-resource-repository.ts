import {EmployeeModel} from "@/domain/models/employee";

export const EMPLOYEE_RESOURCE_REPOSITORY = "EMPLOYEE_RESOURCE_REPOSITORY";

export interface IEmployeeResourceRepository {
    findAll: () => Promise<EmployeeModel[]>;
}



