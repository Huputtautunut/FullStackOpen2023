import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personService from './personservice';
import './popup.css';

const alert = (message, className) => {
  // Create a div element for the alert
  const alertDiv = document.createElement('div');

  // Set the message and class for the alert
  alertDiv.textContent = message;
  alertDiv.className = `popup-message ${className}`;

  // Append the alert to the body
  document.body.appendChild(alertDiv);

  // Remove the alert after a certain duration (e.g., 3 seconds)
  setTimeout(() => {
    document.body.removeChild(alertDiv);
  }, 3000);
};


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (!newName || !newNumber) {
      showAlert('Please enter both name and number.', 'error');
      return;
    }

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      // Person already exists, update the phone number
      const updatedPerson = { ...existingPerson, number: newNumber };

      // Use personService to handle the backend communication
      personService
        .updatePerson(existingPerson.id, updatedPerson)
        .then((data) => {
          // Update the local state with the updated person
          setPersons(persons.map((person) => (person.id === data.id ? data : person)));
          showAlert(`Updated ${data.name}'s phone number.`, 'success');
          // Clear the input fields after updating
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          console.error('Error updating person:', error);
          showAlert('Error updating person. User already deleted from server', 'error');
        });
    } else {
      // Person does not exist, add a new person
      const newPerson = { name: newName, number: newNumber };

      // Use personService to handle the backend communication
      personService
        .create(newPerson)
        .then((data) => {
          // Update the local state with the new person
          setPersons([...persons, data]);
          showAlert(`Added ${data.name}.`, 'success');
          // Clear the input fields after adding
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          console.error('Error adding person:', error);
          showAlert('Error adding person.', 'error');
        });
    }
  };

  const showAlert = (message, type) => {
    // Use the appropriate class based on the message type
    const className = type === 'success' ? 'success' : 'error';

    // Display the message with the specified style
    alert(message, className);
  };

  
  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      // Use personService to delete the person from the backend
      personService
        .deletePerson(id)
        .then(() => {
          // Update the local state by removing the deleted person
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => console.error('Error deleting person:', error));
    }
  };

  useEffect(() => {
    // Use personService to fetch data from the JSON server
    personService.getAll()
      .then(data => setPersons(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
