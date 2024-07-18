import { combineReducers } from '@reduxjs/toolkit';
import anecdoteReducer from './anecdoteReducer';
import filterReducer from './filterReducer';
import notificationReducer from './notificationReducer'; // If you have a notificationReducer

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer, // Add if you have a notificationReducer
  // Add other reducers as needed
});

export default rootReducer;