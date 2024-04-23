const express = require('express');
const app = express();
const port = 3001;

let phonebookEntries = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.use(express.json());

app.get('/api/persons', (req, res) => {
    res.json(phonebookEntries);
});

app.get('/api/persons/:id', (req, res) => {
    const personId = parseInt(req.params.id);
    const person = phonebookEntries.find(entry => entry.id === personId);

    if (person) {
        res.json(person);
    } else {
        res.status(404).json({ error: 'Person not found' });
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const personId = parseInt(req.params.id);
    phonebookEntries = phonebookEntries.filter(entry => entry.id !== personId);
    res.status(204).end();
});

app.get('/info', (req, res) => {
    const infoMessage = `Phonebook has info for ${phonebookEntries.length} people<br>${new Date()}`;
    res.send(infoMessage);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
