import {EmployeeModel} from "@/domain/models/employee";
import {IEmployeeResourceRepository} from "@/domain/models/contracts/employee-resource-repository";

export class EmployeeMysqlRepositoryAdapter implements IEmployeeResourceRepository{
    // Implementation
    findAll(): Promise<EmployeeModel[]> {
        return Promise.resolve([]);
    }
    findById(id: number): Promise<EmployeeModel> {
        return Promise.resolve(undefined);
    }
}
