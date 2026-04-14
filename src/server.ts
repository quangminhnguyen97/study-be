import express from 'express';
import { pool } from './db';

const app = express();
const port = process.env.PORT ?? 3000;

pool.on('error', (err) => {
    console.error('Unexpected pg pool error:', err);
});

app.use(express.json());

const notes = [
    { id: 1, title: 'Note 1', content: 'Learning Express' },
    { id: 2, title: 'Note 2', content: 'Learn Routing' },
];

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


app.get('/notes', async (_req, res) => {
    const result = await pool.query('SELECT * FROM notes');
    console.log(result.rows);
    return res.json({
        status: 'success',
        data: result.rows,
    });
});

app.get('/notes/:id', async (req, res) => {
    const noteId = parseNoteIdParam(req.params.id);

    if (noteId === null) {
        return res.status(400).json({
            status: 'error',
            message: 'Note id must be an integer',
        });
    }

    const result = await pool.query('SELECT * FROM notes WHERE id = $1', [noteId]);
    console.log(result.rows);

    if (result.rows.length === 0) {
        return res.status(404).json({
            status: 'error',
            message: 'Note not found',
        });
    }

    return res.json({
        status: 'success',
        data: result.rows[0],
    });
});

app.post('/notes', async (req, res) => {
    const parsed = validateNoteBody(req.body?.title, req.body?.content);
    if (!parsed.ok) {
        return res.status(400).json({
            status: 'error',
            message: parsed.message,
        });
    }

    const result = await pool.query('INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *', [parsed.title, parsed.content]);

    return res.status(201).json({
        status: 'success',
        data: result.rows[0],
    });
});

app.delete('/notes/:id', async (req, res) => {
    const noteId = parseNoteIdParam(req.params.id);

    if (noteId === null) {
        return res.status(400).json({
            status: 'error',
            message: 'Note id must be an integer',
        });
    }

    await pool.query('DELETE FROM notes WHERE id = $1', [noteId]);

    return res.status(204).send();
});

app.put('/notes/:id', async (req, res) => {
    const noteId = parseNoteIdParam(req.params.id);

    if (noteId === null) {
        return res.status(400).json({
            status: 'error',
            message: 'Note id must be an integer',
        });
    }

    const noteResult = await pool.query('SELECT * FROM notes WHERE id = $1', [noteId]);

    if (noteResult.rows.length === 0) {
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

    const result = await pool.query('UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *', [parsed.title, parsed.content, noteId]);

    return res.json({
        status: 'success',
        data: result.rows[0],
    });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
