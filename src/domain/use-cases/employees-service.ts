import { EmployeeModel } from '@/domain/models';

export const EMPLOYEES_SERVICE = 'EMPLOYEES_SERVICE';


export namespace IEmployeesService {
  export type Result = EmployeeModel[];
}

export interface IEmployeesService {
  getEmployees: () => Promise<EmployeeModel[]>;
}

