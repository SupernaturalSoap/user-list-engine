import { NextFunction, Request, Response } from 'express';
import logger from '../utils/client/logger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error('Error in processing request - %o', err);
    let statusCode = 500;
    if(/^INVALID_/.test(err.message)) statusCode = 400;

    return res.status(statusCode).json({
        message: err.message,
        stack: err.stack
    });
};

export default errorHandler;