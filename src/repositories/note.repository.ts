import { pool } from "../db";

export async function findAllNotes() {
    const result = await pool.query('SELECT * FROM notes');
    return result.rows;
}

export async function findNoteById(id: number) {
    const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
    return result.rows[0] ?? null;
}

export async function insertNote(title: string, content: string) {
    const result = await pool.query(
        'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *',
        [title, content],
    );
    return result.rows[0];
}

export async function updateNote(id: number, title: string, content: string) {
    const result = await pool.query(
        'UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *',
        [title, content, id],
    );
    return result.rows[0] ?? null;
}

export async function deleteNote(id: number) {
    const result = await pool.query('DELETE FROM notes WHERE id = $1', [id]);
    return result.rowCount ?? 0;
}
