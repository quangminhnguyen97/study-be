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
    return jwt.sign(payload, JWT_SECRET as string, {
        expiresIn: '1d',
    });
}

export function verifyAccessToken(token: string) {
    return jwt.verify(token, JWT_SECRET as string) as unknown;
}