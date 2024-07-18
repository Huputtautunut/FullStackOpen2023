import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes'; // Replace with your json-server endpoint

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAll };