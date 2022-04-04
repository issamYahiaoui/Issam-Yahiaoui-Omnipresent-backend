import { CONFIG_MYSQL } from '@/application/config/environment';
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize(CONFIG_MYSQL.database, CONFIG_MYSQL.user, CONFIG_MYSQL.password, {
  dialect: 'mysql',
  models: [],
});
export const loadSequelize = sequelize.authenticate;
