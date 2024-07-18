import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    voteAnecdote(state, action) {
      const { id, votes } = action.payload;
      const anecdoteToChange = state.find(anecdote => anecdote.id === id);
      if (anecdoteToChange) {
        anecdoteToChange.votes = votes;
      }
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    }
  }
});

export const { setAnecdotes, voteAnecdote, addAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

// Async action to fetch anecdotes from backend
export const fetchAnecdotes = () => async dispatch => {
  try {
    const response = await axios.get('http://localhost:3001/anecdotes');
    dispatch(setAnecdotes(response.data));
  } catch (error) {
    console.error('Error fetching anecdotes:', error);
    // Handle error if needed
  }}

  export const voteAnecdoteAsync = (id) => async (dispatch, getState) => {
    try {
      const anecdotes = getState().anecdotes; // Get current state of anecdotes
      const anecdoteToVote = anecdotes.find(anecdote => anecdote.id === id);
  
      if (!anecdoteToVote) {
        console.error(`Anecdote with id ${id} not found.`);
        return;
      }
  
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      };
  
      const response = await axios.patch(`http://localhost:3001/anecdotes/${id}`, updatedAnecdote);
      dispatch(voteAnecdote(response.data)); // Update state with updated anecdote
    } catch (error) {
      console.error('Error voting for anecdote:', error);
      // Handle error if needed
    }
  };
// Async action to add new anecdote to backend
export const addAnecdoteAsync = (content) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:3001/anecdotes', { content, votes: 0 });
    dispatch(addAnecdote(response.data));
  } catch (error) {
    console.error('Error adding anecdote:', error);
    // Handle error if needed
  }
};
