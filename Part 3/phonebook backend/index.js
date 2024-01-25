const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');


const app = express();
const port = 3001;

app.use(morgan('tiny'));
app.use(express.json()); // Enable JSON parsing for request bodies
app.use(cors());
app.use(express.static('dist'))



const phonebookEntries = [
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

function generateRandomId() {
    // Generate a random integer between 100000 and 999999
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

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

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'Name and number are required' });
    }

    const existingPerson = phonebookEntries.find(entry => entry.name === body.name);
    if (existingPerson) {
        return res.status(400).json({ error: 'Name must be unique' });
    }

    const newPerson = {
        id: generateRandomId(),
        name: body.name,
        number: body.number
    };

    phonebookEntries.push(newPerson);

    res.json(newPerson);
});

app.get('/info', (req, res) => {
    const infoMessage = `Phonebook has info for ${phonebookEntries.length} people<br>${new Date()}`;
    res.send(infoMessage);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});