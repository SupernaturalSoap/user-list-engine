import { Router, NextFunction, Request, Response } from 'express';
import logger from '../utils/client/logger';

const router: Router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
    logger.debug('Processing request %o', JSON.stringify({
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body
    }));

    next();
});

export default router;