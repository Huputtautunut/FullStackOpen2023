const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const phonebookEntrySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3 // Ensures the name has at least three characters
  },
  number: {
    type: String,
    required: true,
    validate: {
        validator: function(v) {
            // Regular expression to match the required format
            return /^\d{2,3}-\d{7,}$/i.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
    }
  }
})

phonebookEntrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  const PhonebookEntry = mongoose.model('PhonebookEntry', phonebookEntrySchema);

  module.exports = PhonebookEntry;

  module.exports = mongoose.model('Person', phonebookEntrySchema)