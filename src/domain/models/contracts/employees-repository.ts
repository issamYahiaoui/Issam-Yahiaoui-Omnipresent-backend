import { EmployeeModel } from '@/domain/models';

export const EMPLOYEES_REPOSITORY = 'EMPLOYEES_REPOSITORY';

export namespace IEmployeesRepository {
  export type Result = EmployeeModel[];
}
export interface IEmployeesRepository {
  getEmployees: () => Promise<IEmployeesRepository.Result>;
}

