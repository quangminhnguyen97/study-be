import { findUserByEmail } from "../repositories/user.repository";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ValidateRegisterUserBodyResult =
    | { ok: true; email: string; password: string; full_name: string }
    | { ok: false; message: string };

export async function validateRegisterUserBody(
    email: unknown,
    password: unknown,
    full_name: unknown,
): Promise<ValidateRegisterUserBodyResult> {
    if (typeof full_name !== 'string') {
        return { ok: false, message: 'fullName must be a string' };
    }
    const trimmedFullName = full_name.trim();
    if (trimmedFullName.length === 0) {
        return { ok: false, message: 'fullName must not be empty' };
    }

    if (typeof email !== 'string') {
        return { ok: false, message: 'email must be a string' };
    }
    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedEmail.length === 0) {
        return { ok: false, message: 'email must not be empty' };
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
        return { ok: false, message: 'email format is invalid' };
    }
    const existing = await findUserByEmail(trimmedEmail);
    if (existing) {
        return { ok: false, message: 'email already exists' };
    }

    if (typeof password !== 'string') {
        return { ok: false, message: 'password must be a string' };
    }
    if (password.length === 0) {
        return { ok: false, message: 'password must not be empty' };
    }
    if (password.length < 6) {
        return { ok: false, message: 'password must be at least 6 characters' };
    }

    return { ok: true, email: trimmedEmail, password, full_name: trimmedFullName };
}
