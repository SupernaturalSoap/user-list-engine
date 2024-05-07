import { Application, Router } from 'express';

import LoggerMiddleware from './logger-mw';
import ErrorMiddleware  from './error-mw';

export function before() {
    const router: Router = Router();
    //Logging Middleware
    router.use(LoggerMiddleware);
    return router;
}

export function after(app: Application) {
    const router: Router = Router();
    //Error Middleware
    app.use(ErrorMiddleware);
    return router;
}