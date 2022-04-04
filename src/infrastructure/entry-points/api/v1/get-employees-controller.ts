import { GET_EMPLOYEES_SERVICE, IGetEmployeesService } from '@/domain/use-cases';
import { Mapping, Get, Adapter } from '@tsclean/core';

@Mapping('api/v1/employees')
export class GetEmployeesController {
  constructor(
    @Adapter(GET_EMPLOYEES_SERVICE)
    private readonly employeesService: IGetEmployeesService,
  ) {}

  // TODO: Add Pagination
  @Get()
  async getEmployees(): Promise<any> {
    return this.employeesService.getEmployees();
  }
}
