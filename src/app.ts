import express, { NextFunction, Request, Response } from 'express';
import { pool } from './db';
import noteRoutes from './routes/note.routes';
import authRoutes from './routes/auth.routes';

const app = express();

pool.on('error', (err) => {
    console.error('Unexpected pg pool error:', err);
});

app.use(express.json());

// ─── Routes ─────────────────────────────────────────────────────────────────

app.get('/health', async (_req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        return res.status(200).json({ status: 'success', data: result.rows });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Database connection failed' });
    }
});

app.use('/notes', noteRoutes);

app.use('/auth', authRoutes);

// ─── Global error handler ────────────────────────────────────────────────────

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
});

export default app;
