// src/App.jsx

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAnecdotes } from './reducers/anecdoteReducer';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
