import { loadSequelize } from './db/sequelize';

export const loadersInit = async () => {
  await loadSequelize();
};
