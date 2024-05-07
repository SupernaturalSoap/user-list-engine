export const appConfig = {
    APP: {
        LANG: process.env.LANG,
        NAME: process.env.APP_NAME,
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.APP_PORT,
        TZ: process.env.TZ
    },
    DB: {
        MONGO: {
            URL: process.env.APP_MONGO_URL,
            NAME: process.env.APP_DB_NAME
        }
    },
    LOGGER: {
        DIR: process.env.APP_LOGGER_DIR,
        LEVEL: process.env.APP_LOGGER_LEVEL
    }
};
