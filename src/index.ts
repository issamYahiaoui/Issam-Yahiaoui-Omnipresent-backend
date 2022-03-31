import "module-alias/register";

import helmet from 'helmet';
import { Sequelize } from 'sequelize-typescript';

import {StartProjectInit} from "@tsclean/core";

import {AppContainer} from "@/application/app";
import {PORT, CONFIG_MYSQL} from "@/application/config/environment";
import {EmployeeModelMysql} from "@/infrastructure/driven-adapters/adapters/orm/sequelize/models/employee-mysql";
const sequelize = new Sequelize(CONFIG_MYSQL.database, CONFIG_MYSQL.user, CONFIG_MYSQL.password, {
    dialect: 'mysql',
    models: [EmployeeModelMysql],
});

async function init() {
    await sequelize.authenticate()
    console.log("DB mysql")
    const app = await StartProjectInit.create(AppContainer)
    app.use(helmet());
    await app.listen(PORT, () => console.log('Running on port ' + PORT))
}

init();
