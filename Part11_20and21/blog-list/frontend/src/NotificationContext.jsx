// src/context/NotificationContext.js

import React, { createContext, useReducer, useContext } from 'react';

// Define action types
const SET_NOTIFICATION = 'SET_NOTIFICATION';
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

// Define initial state
const initialState = {
  message: null,
  type: 'success', // 'success' or 'error'
};

// Define reducer function
const notificationReducer = (state, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    case CLEAR_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
};

// Create context
const NotificationContext = createContext();

// Create provider component
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const setNotification = (message, type = 'success') => {
    dispatch({
      type: SET_NOTIFICATION,
      payload: { message, type },
    });
    setTimeout(() => {
      dispatch({ type: CLEAR_NOTIFICATION });
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ state, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotification = () => useContext(NotificationContext);
