import express from 'express';
import { pool } from './db';

const app = express();
const port = 3000;

app.use(express.json());

const notes = [
    { id: 1, title: 'Note 1', content: 'Learning Express' },
    { id: 2, title: 'Note 2', content: 'Learn Routing' },
];

/** Trả về id dạng số nguyên hoặc null nếu param không hợp lệ */
function parseNoteIdParam(id: string | undefined): number | null {
    if (id === undefined) return null;
    const noteId = Number(id);
    return Number.isInteger(noteId) ? noteId : null;
}

type ValidateNoteResult = { ok: true; title: string; content: string } | { ok: false; message: string };

function validateNoteBody(title: unknown, content: unknown): ValidateNoteResult {
    if (title == null || content == null) {
        return { ok: false, message: 'Title and content are required' };
    }
    if (typeof title !== 'string' || typeof content !== 'string') {
        return { ok: false, message: 'Title and content must be strings' };
    }
    const normalizedTitle = title.trim();
    const normalizedContent = content.trim();
    if (normalizedTitle.length === 0 || normalizedContent.length === 0) {
        return { ok: false, message: 'Title and content must not be empty' };
    }
    if (normalizedTitle.length > 100 || normalizedContent.length > 1000) {
        return {
            ok: false,
            message:
                'Title and content must be less than 100 and 1000 characters respectively',
        };
    }
    return { ok: true, title: normalizedTitle, content: normalizedContent };
}


app.get('/health', async (_req, res) => {
    try {
      const result = await pool.query('SELECT NOW()');
  
      return res.status(200).json({
        status: 'success',
        data: result.rows,
      });
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({
        status: 'error',
        message: 'Database connection failed',
      });
    }
  });
  

app.get('/notes', (req, res) => {
    return res.json({
        status: 'success',
        data: notes,
    });
});

app.get('/notes/:id', (req, res) => {
    const noteId = parseNoteIdParam(req.params.id);

    if (noteId === null) {
        return res.status(400).json({
            status: 'error',
            message: 'Note id must be an integer',
        });
    }

    const note = notes.find((n) => n.id === noteId);

    if (!note) {
        return res.status(404).json({
            status: 'error',
            message: 'Note not found',
        });
    }

    return res.json({
        status: 'success',
        data: note,
    });
});

app.post('/notes', (req, res) => {
    const parsed = validateNoteBody(req.body?.title, req.body?.content);
    if (!parsed.ok) {
        return res.status(400).json({
            status: 'error',
            message: parsed.message,
        });
    }

    const newId = Math.max(0, ...notes.map((n) => n.id)) + 1;
    const newNote = {
        id: newId,
        title: parsed.title,
        content: parsed.content,
    };
    notes.push(newNote);

    return res.status(201).json({
        status: 'success',
        data: newNote,
    });
});

app.delete('/notes/:id', (req, res) => {
    const noteId = parseNoteIdParam(req.params.id);

    if (noteId === null) {
        return res.status(400).json({
            status: 'error',
            message: 'Note id must be an integer',
        });
    }

    const note = notes.find((n) => n.id === noteId);

    if (!note) {
        return res.status(404).json({
            status: 'error',
            message: 'Note not found',
        });
    }

    notes.splice(notes.indexOf(note), 1);

    return res.status(204).send();
});

app.put('/notes/:id', (req, res) => {
    const noteId = parseNoteIdParam(req.params.id);

    if (noteId === null) {
        return res.status(400).json({
            status: 'error',
            message: 'Note id must be an integer',
        });
    }

    const note = notes.find((n) => n.id === noteId);

    if (!note) {
        return res.status(404).json({
            status: 'error',
            message: 'Note not found',
        });
    }

    const parsed = validateNoteBody(req.body?.title, req.body?.content);
    if (!parsed.ok) {
        return res.status(400).json({
            status: 'error',
            message: parsed.message,
        });
    }

    note.title = parsed.title;
    note.content = parsed.content;

    return res.json({
        status: 'success',
        data: note,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
