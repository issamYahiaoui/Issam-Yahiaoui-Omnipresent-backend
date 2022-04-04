import { EmployeeModel } from '@/domain/models';

export const GET_EMPLOYEES_SERVICE = 'GET_EMPLOYEES_SERVICE';

export interface IGetEmployeesService {
  getEmployees: () => Promise<EmployeeModel[]>;
}

// eslint-disable-next-line no-redeclare
export namespace IGetEmployeesService {
  export type Result = EmployeeModel[];
}
