import { Router } from 'express';
import { createNote, deleteNoteById, getAllNotes, getNoteById, updateNoteById } from '../controllers/note.controller';

const router = Router();

router.get('/', getAllNotes);

router.get('/:id', getNoteById);

router.post('/', createNote);

router.put('/:id', updateNoteById);

router.delete('/:id', deleteNoteById);

export default router;
