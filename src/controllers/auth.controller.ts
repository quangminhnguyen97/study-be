import { insertUser } from "../repositories/user.repository";
import { validateLoginUser, validateLoginUserBody, validateRegisterUserBody } from "../utils/auth";
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

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const parsed = await validateLoginUserBody(email, password);
        if (!parsed.ok) {
            return res.status(400).json({ status: 'error', message: parsed.message });
        }
        const result = await validateLoginUser(parsed.email, parsed.password);
        if (!result.ok) {
            return res.status(401).json({ status: 'error', message: result.message });
        }
        return res.status(200).json({ status: 'success', data: result.user });
    }
    catch (error) {
        next(error);
    }
}