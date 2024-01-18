import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    // Check if the name or number already exists in the phonebook
    if (
      persons.some((person) => person.name === newName) ||
      persons.some((person) => person.number === newNumber)
    ) {
      alert(`${newName} or ${newNumber} is already added to the phonebook.`);
      return;
    }

    // Add the new person to the phonebook
    setPersons([...persons, { name: newName, number: newNumber }]);
    // Clear the input fields after adding
    setNewName('');
    setNewNumber('');
  };

  useEffect(() => {
    // Fetch data from the JSON server
    fetch('http://localhost:3001/persons')
      .then((response) => response.json())
      .then((data) => setPersons(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  // Filter the persons based on the search term
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

      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
