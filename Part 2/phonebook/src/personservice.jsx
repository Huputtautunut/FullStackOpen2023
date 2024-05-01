// Import axios for making HTTP requests
import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return fetch(baseUrl)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
};

const create = newPerson => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPerson),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add person: ' + response.statusText);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error adding person:', error.message);
      throw error;
    });
};

const deletePerson = (id) => {
  const url = `${baseUrl}/${id}`;
  console.log('Deleting person:', url);
  return fetch(`${url}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error deleting person:', error);
      throw error;
    });
};

const updatePerson = (id, updatedPerson) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPerson),
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error updating person:', error);
      throw error;
    });
};

const personService = {
  getAll,
  create,
  deletePerson,
  updatePerson,
};

export default personService;
