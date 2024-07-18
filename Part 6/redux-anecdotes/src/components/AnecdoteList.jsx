import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdoteAsync } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(voteAnecdoteAsync(id)); // Ensure this dispatches 'voteAnecdoteAsync' with 'id'
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>Votes: {anecdote.votes}</div>
          <button onClick={() => handleVote(anecdote.id)}>Vote</button> {/* Ensure handleVote is called correctly */}
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;