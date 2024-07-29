// src/services/blogs.js

import axios from 'axios';
import storage from './storage';

const baseUrl = '/api/blogs';

const getConfit = () => ({
  headers: { Authorization: `Bearer ${storage.loadUser().token}` },
});

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject, getConfit()).then((response) => response.data);

const create = (newObject) => axios.post(baseUrl, newObject, getConfit()).then((response) => response.data);

const remove = (id) => axios.delete(`${baseUrl}/${id}`, getConfit()).then((response) => response.data);

// Comments endpoints
const getComments = (blogId) => axios.get(`${baseUrl}/${blogId}/comments`).then((response) => response.data);

const addComment = (blogId, comment) => axios.post(`${baseUrl}/${blogId}/comments`, comment, getConfit()).then((response) => response.data);

const deleteComment = (commentId) => axios.delete(`/api/comments/${commentId}`, getConfit()).then((response) => response.data);

export default { getAll, create, update, remove, getComments, addComment, deleteComment };
