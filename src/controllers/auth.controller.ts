import { insertUser } from "../repositories/user.repository";
import { validateRegisterUserBody } from "../utils/auth";
import { NextFunction, Request, Response } from 'express';



export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, full_name } = req.body;
        const parsed = await validateRegisterUserBody(email, password, full_name);
        if (!parsed.ok) {
            return res.status(400).json({ status: 'error', message: parsed.message });
        }
        const result = await insertUser(parsed.email, parsed.password, parsed.full_name);
        return res.status(201).json({ status: 'success', data: result });
    } catch (error) {
        next(error);
    }
}