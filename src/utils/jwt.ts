import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('Missing environment variable: JWT_SECRET');
}

export type JwtPayload = {
    userId: number;
    email: string;
};

export function signAccessToken(payload: JwtPayload) {
    if (!JWT_SECRET) {
        throw new Error('Missing environment variable: JWT_SECRET');
    }
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1d',
    });
}

export function verifyAccessToken(token: string): JwtPayload {
    if (!JWT_SECRET) {
        throw new Error('Missing environment variable: JWT_SECRET');
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (
        typeof decoded !== 'object' ||
        decoded === null ||
        typeof decoded.userId !== 'number' ||
        typeof decoded.email !== 'string'
    ) {
        throw new Error('Invalid token payload');
    }

    return {
        userId: decoded.userId,
        email: decoded.email,
    };
}