import express from 'express';

const app = express();
const port = 3000;

app.get('/health', (req, res) => {
    // res.send('Hello world');
    res.json({ message: 'OK' });
});

app.get('/notes', (req, res) => {
    return res.json({
        status: 'success',
        data: [
            { id: 1, title: 'Note 1', content: 'Learning Express' },
            { id: 2, title: 'Note 2', content: 'Learn Routing' },
        ],
    });
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});