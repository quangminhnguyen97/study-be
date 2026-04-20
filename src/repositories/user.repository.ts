import { pool } from "../db";

export async function findUserByEmail(email: string) {
    const result = await pool.query('SELECT id FROM users WHERE email = $1 LIMIT 1', [email]);
    return result.rows[0] ?? null;
}

export async function insertUser(email: string, password: string, full_name: string) {
    const result = await pool.query(
        'INSERT INTO users (email, password, full_name) VALUES ($1, $2, $3) RETURNING *',
        [email, password, full_name],
    );
    return result.rows[0];
}