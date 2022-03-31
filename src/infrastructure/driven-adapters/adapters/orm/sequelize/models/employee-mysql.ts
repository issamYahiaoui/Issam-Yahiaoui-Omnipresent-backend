import { Table, Column, Model, Sequelize } from 'sequelize-typescript'
import { EmployeeModel } from "@/domain/models/employee";

@Table({ tableName: 'employees' })
export class EmployeeModelMysql extends Model<EmployeeModel> {
    // Implementation
}