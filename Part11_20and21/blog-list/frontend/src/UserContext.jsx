import { createContext, useReducer } from 'react';

// Create the context
export const UserContext = createContext();

// Define the reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'CLEAR_USER':
      return null;
    default:
      return state;
  }
};

// Define the UserProvider component
export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
