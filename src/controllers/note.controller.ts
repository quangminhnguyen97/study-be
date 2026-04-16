import { NextFunction, Request, Response } from 'express';
import { pool } from "../db";
import { parseNoteIdParam, validateNoteBody } from "../utils/note";


export const getAllNotes = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await pool.query('SELECT * FROM notes');
        return res.json({ status: 'success', data: result.rows });
    } catch (error) {
        next(error);
    }
};

export const getNoteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const noteId = parseNoteIdParam(req.params.id);
        if (noteId === null) {
            return res.status(400).json({ status: 'error', message: 'Note id must be a positive integer' });
        }
        const result = await pool.query('SELECT * FROM notes WHERE id = $1', [noteId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Note not found' });
        }
        return res.json({ status: 'success', data: result.rows[0] });
    } catch (error) {
        next(error);
    }
};


export const createNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = validateNoteBody(req.body?.title, req.body?.content);
        if (!parsed.ok) {
            return res.status(400).json({ status: 'error', message: parsed.message });
        }
        const result = await pool.query(
            'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *',
            [parsed.title, parsed.content],
        );
        return res.status(201).json({ status: 'success', data: result.rows[0] });
    } catch (error) {
        next(error);
    }
}

export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const noteId = parseNoteIdParam(req.params.id);
        if (noteId === null) {
            return res.status(400).json({ status: 'error', message: 'Note id must be a positive integer' });
        }
        const parsed = validateNoteBody(req.body?.title, req.body?.content);
        if (!parsed.ok) {
            return res.status(400).json({ status: 'error', message: parsed.message });
        }
        const result = await pool.query(
            'UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *',
            [parsed.title, parsed.content, noteId],
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ status: 'error', message: 'Note not found' });
        }
        return res.json({ status: 'success', data: result.rows[0] });
    } catch (error) {
        next(error);
    }
}

export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const noteId = parseNoteIdParam(req.params.id);
        if (noteId === null) {
            return res.status(400).json({ status: 'error', message: 'Note id must be a positive integer' });
        }
        const result = await pool.query('DELETE FROM notes WHERE id = $1', [noteId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ status: 'error', message: 'Note not found' });
        }
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}