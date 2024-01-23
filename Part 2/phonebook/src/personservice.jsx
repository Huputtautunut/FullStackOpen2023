const baseUrl = 'http://localhost:3001/api/persons';

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
    .then(response => response.json())
    .catch(error => {
      console.error('Error adding person:', error);
      throw error;
    });
};

const deletePerson = (id) => { // Changed the function name here
  return fetch(`${baseUrl}/${id}`, {
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
