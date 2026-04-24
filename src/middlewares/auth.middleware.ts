import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/jwt';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                status: 'error',
                message: 'Missing Authorization header',
            });
        }

        const [scheme, token] = authHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid Authorization format',
            });
        }

        const payload = verifyAccessToken(token);

        (req as Request & { user?: typeof payload }).user = payload;

        next();
    } catch (error) {
        next(error);
    }
};
