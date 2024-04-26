const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const morgan = require('morgan');
const cors = require('cors');

// Define a custom token format for morgan to log request body data for POST requests
morgan.token('postData', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return '';
});

app.use(morgan('tiny'));
app.use(express.json()); // Enable JSON parsing for request bodies
app.use(cors());

app.use(express.static('dist')) //Tis' the reason why we see frontend when opening site instead of json data


// Configure morgan middleware to log messages to the console based on the custom token format
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

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

    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'Name or number is missing' });
    }

    const existingPerson = phonebookEntries.find(entry => entry.name === body.name);
    if (existingPerson) {
        return res.status(400).json({ error: 'Name must be unique' });
    }

    const newEntry = {
        id: generateId(),
        name: body.name,
        number: body.number
    };

    phonebookEntries = phonebookEntries.concat(newEntry);
    res.json(newEntry);
});

// PUT endpoint to update an existing phonebook entry by ID
app.put('/api/persons/:id', (req, res) => {
    const personId = parseInt(req.params.id);
    const body = req.body;

    const personIndex = phonebookEntries.findIndex(entry => entry.id === personId);
    if (personIndex === -1) {
        return res.status(404).json({ error: 'Person not found' });
    }

    const updatedPerson = { ...phonebookEntries[personIndex], ...body };
    phonebookEntries[personIndex] = updatedPerson;
    res.json(updatedPerson);
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
