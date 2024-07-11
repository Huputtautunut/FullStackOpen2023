require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use('/api/blogs', blogRoutes);

module.exports = app;
