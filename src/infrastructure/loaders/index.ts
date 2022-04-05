import { loadSequelize } from './db/sequelize';



// We can include here any loader  [ Db, Logger, Parser .. ]
export const loadersInit = async () => {
  await loadSequelize();
};
