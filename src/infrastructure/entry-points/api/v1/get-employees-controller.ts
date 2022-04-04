import { EMPLOYEES_SERVICE, IEmployeesService } from '@/domain/use-cases';
import { Mapping, Get, Adapter } from '@tsclean/core';

@Mapping('api/v1/employees')
export class GetEmployeesController {
  constructor(
    @Adapter(EMPLOYEES_SERVICE)
    private readonly employeesService: IEmployeesService,
  ) {}

  // TODO: Add Pagination
  @Get()
  async getEmployees(): Promise<any> {
    return this.employeesService.getEmployees();
  }
}
