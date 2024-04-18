const baseUrl = 'https://phonebook-backend1.fly.dev/api/persons';


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


const deletePerson = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    console.log('DELETE request to:', url);
    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`Error deleting person: ${response.statusText}`);
    }

    return response.json();
  })
  .catch(error => {
    console.error('Error deleting person:', error.message);
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