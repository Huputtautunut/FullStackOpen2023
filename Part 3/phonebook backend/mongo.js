const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Give the password as an argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://Johu:${password}@fullstack.hcnkqsq.mongodb.net/?retryWrites=true&w=majority&appName=FullStack`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const phonebookEntrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

const PhonebookEntry = mongoose.model('PhonebookEntry', phonebookEntrySchema);

const handleAddEntry = () => {
  if (process.argv.length !== 5) {
    console.log('Invalid number of arguments for adding an entry');
    mongoose.connection.close();
    process.exit(1);
  }

  const name = process.argv[3];
  const number = process.argv[4];

  const newEntry = new PhonebookEntry({
    name,
    number,
  });

  newEntry.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
};

const handleDisplayEntries = async () => {
  try {
    const entries = await PhonebookEntry.find();
    console.log('phonebook:');
    entries.forEach((entry) => {
      console.log(`${entry.name} ${entry.number}`);
    });
  } catch (error) {
    console.error('Error fetching phonebook entries:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Check if additional arguments are provided
if (process.argv.length > 3) {
  handleAddEntry();
} else {
  handleDisplayEntries();
}