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

app.post('/api/persons', (req, res) => {
    const body = req.body;

    // Check if name or number is missing
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'Name or number is missing' });
    }

    // Check if the name already exists in the phonebook
    const existingPerson = phonebookEntries.find(entry => entry.name === body.name);
    if (existingPerson) {
        return res.status(400).json({ error: 'Name must be unique' });
    }

    // Create a new entry
    const newEntry = {
        id: generateId(),
        name: body.name,
        number: body.number
    };

    phonebookEntries = phonebookEntries.concat(newEntry);
    res.json(newEntry);
});


app.get('/info', (req, res) => {
    const infoMessage = `Phonebook has info for ${phonebookEntries.length} people<br>${new Date()}`;
    res.send(infoMessage);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

function generateId() {
    //const maxId = phonebookEntries.length > 0 ? Math.max(...phonebookEntries.map(entry => entry.id)) : 0;
    //return maxId + 1;
    return Math.floor(Math.random() * 1000000) + 1;
}
