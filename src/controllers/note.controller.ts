import { NextFunction, Request, Response } from 'express';
import { parseNoteIdParam, validateNoteBody } from "../utils/note";
import { findAllNotes, findNoteById, insertNote, updateNote, deleteNote } from '../repositories/note.repository';


export const getAllNotes = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await findAllNotes();
        return res.json({ status: 'success', data: result });
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
        const result = await findNoteById(noteId);
        if (result === null) {
            return res.status(404).json({ status: 'error', message: 'Note not found' });
        }
        return res.json({ status: 'success', data: result });
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
        const result = await insertNote(parsed.title, parsed.content);
        return res.status(201).json({ status: 'success', data: result });
    } catch (error) {
        next(error);
    }
}

export const updateNoteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const noteId = parseNoteIdParam(req.params.id);
        if (noteId === null) {
            return res.status(400).json({ status: 'error', message: 'Note id must be a positive integer' });
        }
        const parsed = validateNoteBody(req.body?.title, req.body?.content);
        if (!parsed.ok) {
            return res.status(400).json({ status: 'error', message: parsed.message });
        }
        const result = await updateNote(noteId, parsed.title, parsed.content);
        if (result === null) {
            return res.status(404).json({ status: 'error', message: 'Note not found' });
        }
        return res.json({ status: 'success', data: result });
    } catch (error) {
        next(error);
    }
}

export const deleteNoteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const noteId = parseNoteIdParam(req.params.id);
        if (noteId === null) {
            return res.status(400).json({ status: 'error', message: 'Note id must be a positive integer' });
        }
        const result = await deleteNote(noteId);
        if (result === null) {
            return res.status(404).json({ status: 'error', message: 'Note not found' });
        }
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}