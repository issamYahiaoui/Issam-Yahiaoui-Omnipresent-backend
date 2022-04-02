import { createLogger, transports, format } from 'winston';
import * as Config from '@/application/config/environment';

const homeDir = require('os').homedir();
const logDir = homeDir + '/omnipresent_backend_logs';
const trans = [];

if (Config.ENVIRONMENT !== 'test')
    trans.push(
        // info log setting
        new transports.File({
            level: 'info',
            dirname: logDir, // log file /logs/info/*.log in save
            filename: `omnipresent_app.log`,
            maxsize: 1000000000,
            maxFiles: 1,
            format: format.combine(format.timestamp(), format.json()),
        }),
    );

if (Config.CONSOLE_LOGG_ENABLED)
    trans.push(
        new transports.Console({
            format: format.combine(format.timestamp(), format.colorize(), format.simple()),
        }),
    );

const logger = createLogger({
    format: format.combine(format.errors({ stack: true }), format.json()),
    transports: trans,
});

export default logger;
