import bcrypt from 'bcryptjs';
import { pool } from "../db";

export async function findUserByEmail(email: string) {
    const result = await pool.query('SELECT id, email, password_hash, full_name FROM users WHERE email = $1 LIMIT 1', [email]);
    return result.rows[0] ?? null;
}

export async function insertUser(email: string, password: string, full_name: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name, created_at',
        [email, hashedPassword, full_name],
    );
    return result.rows[0];
}