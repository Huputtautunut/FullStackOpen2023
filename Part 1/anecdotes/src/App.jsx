import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast is to go well.'
  ];

  const initialVotes = new Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(initialVotes);

  const handleRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  // Find the index of the anecdote with the maximum votes
  const indexOfMaxVotes = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <div>
        <h2>Anecdote of the Day</h2>
        {anecdotes[selected]}
        <p>Votes: {votes[selected]}</p>
      </div>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleRandomAnecdote}>Show Random Anecdote</button>
      <div>
        <h2>Top Voted Anecdote</h2>
        {votes[indexOfMaxVotes] > 0 ? (
          <div>
            <p>{anecdotes[indexOfMaxVotes]}</p>
            <p>Votes: {votes[indexOfMaxVotes]}</p>
          </div>
        ) : (
          <p>No votes yet</p>
        )}
      </div>
    </div>
  );
};

export default App;
