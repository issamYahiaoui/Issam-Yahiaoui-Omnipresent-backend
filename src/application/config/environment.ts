import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

/**
|----------------------------------------------------------------------------------------|
    App Configuration
|----------------------------------------------------------------------------------------|
*/
export const ENVIRONMENT = process.env.NODE_ENV;
export const PROD = ENVIRONMENT === 'production';
export const PORT = process.env.PORT;

/**
|----------------------------------------------------------------------------------------|
    Authentication Configuration
|----------------------------------------------------------------------------------------|
*/

export const SESSION_SECRET = process.env.JWT_SECRET || '';

/**
 * Use only if you include jwt
 */
// if (!SESSION_SECRET) process.exit(1)

/**
|----------------------------------------------------------------------------------------|
    Databases Configuration
|----------------------------------------------------------------------------------------|
*/

/**
 *  MySQL
 */
export const CONFIG_MYSQL = {
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
};


/**
 *  MySQL
 */
export const CONFIG_SQLITE = {
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
};


export const CONSOLE_LOGG_ENABLED = process.env.CONSOLE_LOGG_ENABLED || false;
export const COUNTRIES_SERVICE_URL = process.env.COUNTRIES_SERVICE_URL || "https://restcountries.com/v3.1/alpha";
