import { GetEmployeesController } from './v1/get-employees-controller';
import { HealthCheck } from "@/infrastructure/entry-points/api/health-check";

export const controllers = [GetEmployeesController, HealthCheck];
