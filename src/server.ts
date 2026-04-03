import express from 'express';

const app = express();
const port = 3000;

app.use(express.json())

const notes = [
    { id: 1, title: 'Note 1', content: 'Learning Express' },
    { id: 2, title: 'Note 2', content: 'Learn Routing' },
];

app.get('/health', (req, res) => {
    res.json({ message: 'OK' });
});

app.get('/notes', (req, res) => {
    return res.json({
        status: 'success',
        data: notes,
    });
});


app.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    const noteId = +id;

    if (!Number.isInteger(noteId)) {
        return res.status(400).json({
            status: 'error',
            message: 'Note id must be an integer',
        });
    }

    const note = notes.find((note) => note.id === noteId);

    if (!note) {
        return res.status(404).json({
            status: 'error',
            message: 'Note not found'
        })
    }

    return res.json({
        status: 'success',
        data: note
    });
});

app.post('/notes', (req, res) => {
	const { title, content } = req.body
    if (!title || !content) {
        return res.status(400).json({
            status: 'error',
            message: 'Title and content are required'
        })
    }

    const normalizedTitle = title.trim()
    const normalizedContent = content.trim()

    if (normalizedTitle.length === 0 || normalizedContent.length === 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Title and content must be strings'
        })
    }
    if (normalizedTitle.length === 0 || normalizedContent.length === 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Title and content must not be empty'
        })
    }
    if (normalizedTitle.length > 100 || normalizedContent.length > 1000) {
        return res.status(400).json({
            status: 'error',
            message: 'Title and content must be less than 100 and 1000 characters respectively'
        })
    }
    
	const newId = Math.max(0, ...notes.map(n => n.id)) + 1
    const newNote = { id: newId, title: normalizedTitle, content: normalizedContent }    
    notes.push(newNote)
	
	return res.status(201).json({
		status: 'success',
		data: newNote
	})
})

app.delete('/notes/:id', (req, res) => {
	const { id } = req.params;
	const noteId = +id;
	
	if (!Number.isInteger(noteId)) {
		return res.status(400).json({
			status: 'error',
			message: 'Note id must be an integer'
		})
	}
	
	const note = notes.find((note) => note.id === noteId);
	
	if (!note) {
		return res.status(404).json({
			status: 'error',
			message: 'Note not found'
		})
	}
	
	notes.splice(notes.indexOf(note), 1);
	
	return res.status(204).json({
		status: 'success',
		message: 'Note deleted successfully'
	})
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});