const mongoose = require('mongoose');

const password = process.argv[2];

const url = `mongodb+srv://Johu:${password}@cluster0.4aqqvqr.mongodb.net/?retryWrites=true&w=majority`;
// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const phonebookEntrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

const PhonebookEntry = mongoose.model('PhonebookEntry', phonebookEntrySchema);

const getAllEntries = async () => {
  try {
    const entries = await PhonebookEntry.find();
    return entries;
  } catch (error) {
    throw error;
  }
};

const getEntryById = async (id) => {
  try {
    const entry = await PhonebookEntry.findById(id);
    return entry;
  } catch (error) {
    throw error;
  }
};

const addEntry = async (name, number) => {
  try {
    const existingPerson = await PhonebookEntry.findOne({ name });

    if (existingPerson) {
      throw { message: 'Name must be unique' };
    }

    const newPerson = new PhonebookEntry({
      name,
      number,
    });

    const savedPerson = await newPerson.save();
    return savedPerson;
  } catch (error) {
    throw error;
  }
};

const deleteEntry = async (id) => {
  try {
    const deletedPerson = await PhonebookEntry.findByIdAndRemove(id);
    return deletedPerson;
  } catch (error) {
    throw error;
  }
};

const countEntries = async () => {
  try {
    const count = await PhonebookEntry.countDocuments();
    return count;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllEntries,
  getEntryById,
  addEntry,
  deleteEntry,
  countEntries,
};
