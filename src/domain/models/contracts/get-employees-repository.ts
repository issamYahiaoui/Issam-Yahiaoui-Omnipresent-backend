import { EmployeeModel } from '@/domain/models';

export const GET_EMPLOYEES_REPOSITORY = 'GET_EMPLOYEES_REPOSITORY';

export interface IGetEmployeesRepository {
  getEmployees: () => Promise<IGetEmployeesRepository.Result>;
}

export namespace IGetEmployeesRepository {
  export type Result = EmployeeModel[];
}
