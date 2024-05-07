import path from 'path';
import {createLogger, transports, format } from 'winston';

const { combine, printf, timestamp, splat } = format;

const config = {
    LANG: process.env.LANG!,
    ENV: process.env.NODE_ENV!,
    TZ: process.env.TZ!,
    APP_NAME: process.env.APP_NAME!,
    LOGGER_DIR: process.env.APP_LOGGER_DIR!,
    LOGGER_LEVEL: process.env.APP_LOGGER_LEVEL!
};

const ts = () => {
    return new Date().toLocaleString(config.LANG, {
        timeZone: config.TZ
    });
}

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    level: config.LOGGER_LEVEL,
    format: combine(splat(), timestamp({ format: ts }), myFormat),
    transports: [
        new transports.File({
            // filename: `${config.APP_NAME}.log`
            filename: path.join(config.LOGGER_DIR ? config.LOGGER_DIR : "", `${config.APP_NAME}.log`)
        })
    ]
});

if (config.ENV !== 'production') {
    logger.add(new transports.Console());
}

export default logger;