require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;
const morgan = require('morgan');
const cors = require('cors');
const PhonebookEntry = require('./models/phonebook');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

app.get('/api/persons', (req, res, next) => {
    PhonebookEntry.find({})
        .then(result => {
            res.json(result);
        })
        .catch(error => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
    PhonebookEntry.findById(req.params.id)
        .then(phonebook => {
            if (phonebook) {
                res.json(phonebook);
            } else {
                res.status(404).end();
            }
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
    PhonebookEntry.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'Name or number is missing' });
    }

    const newEntry = new PhonebookEntry({
        name: body.name,
        number: body.number
    });

    newEntry.save()
        .then(savedEntry => {
            res.json(savedEntry);
        })
        .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body;

    PhonebookEntry.findByIdAndUpdate(
        req.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedPerson => {
            res.json(updatedPerson);
        })
        .catch(error => next(error));
});

app.get('/info', (req, res, next) => {
    PhonebookEntry.countDocuments({})
        .then(count => {
            const infoMessage = `Phonebook has info for ${count} people<br>${new Date()}`;
            res.send(infoMessage);
        })
        .catch(error => next(error));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

