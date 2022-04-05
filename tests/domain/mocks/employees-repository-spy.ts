import { IEmployeesRepository } from "@/domain/models";
import { EMPLOYEES_COUNTRIES_DATA } from "@/tests/domain/mocks/common";



export class EmployeesRepositorySpy implements IEmployeesRepository {
   result = EMPLOYEES_COUNTRIES_DATA.FAKE_EMPLOYEES_DATA;

  async getEmployees(): Promise<IEmployeesRepository.Result> {
    return this.result;
  }
}
