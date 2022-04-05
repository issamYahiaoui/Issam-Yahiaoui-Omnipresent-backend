import { EMPLOYEES_SERVICE, IEmployeesService } from '@/domain/use-cases';
import { Mapping, Get, Adapter, Response } from '@tsclean/core';
import BaseExpressController from "@/infrastructure/entry-points/base-controller";

@Mapping('api/v1/employees')
export class GetEmployeesController extends BaseExpressController{
  constructor(
    @Adapter(EMPLOYEES_SERVICE)
    private readonly employeesService: IEmployeesService,
  ) {
    super()
  }

  // TODO: Add Pagination
  @Get()
  async getEmployees(@Response() res): Promise<any> {
    try {
      const employees = await this.employeesService.getEmployees();
      this.json( res, employees);
    }catch (e) {
      this.catch(e, res)
    }
    return this.employeesService.getEmployees();
  }
}
