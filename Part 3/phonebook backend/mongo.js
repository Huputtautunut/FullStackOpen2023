const mongoose = require('mongoose')

// Define schema for phonebook entry
const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

if (process.argv.length < 3) {
  console.log('Give the password as an argument');
  process.exit(1);
}

const password = process.argv[2];

// Create model for phonebook entry
const PhonebookEntry = mongoose.model('PhonebookEntry', phonebookSchema)

// Connect to MongoDB
const url = `mongodb+srv://Johu:${password}@fullstack.hcnkqsq.mongodb.net/?retryWrites=true&w=majority&appName=FullStack` // Change URL as needed
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// If only password provided, display all entries in phonebook
if (process.argv.length === 3) {
  PhonebookEntry.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(entry => {
      console.log(`${entry.name} ${entry.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  // Create new entry
  const entry = new PhonebookEntry({
    name: name,
    number: number
  })

  // Save the new entry
  entry.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('Invalid number of arguments.')
  process.exit(1)
}
