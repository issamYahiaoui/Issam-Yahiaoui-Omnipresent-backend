import { CONFIG_MYSQL } from "@/application/config/environment";
import { EmployeeModelMysql } from "@/infrastructure/driven-adapters/adapters/orm/sequelize/models/employee-mysql";
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize(CONFIG_MYSQL.database, CONFIG_MYSQL.user, CONFIG_MYSQL.password, {
    dialect: 'mysql',
    models: [EmployeeModelMysql],
});
export const  loadSequelize = sequelize.authenticate

