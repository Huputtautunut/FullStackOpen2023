import axios from 'axios';
import storage from './storage';

const baseUrl = '/api/users';

const getConfit = () => ({
  headers: { Authorization: `Bearer ${storage.loadUser().token}` },
});

const getAll = () => {
  const request = axios.get(baseUrl, getConfit());
  return request.then(response => response.data);
};

export default { getAll };