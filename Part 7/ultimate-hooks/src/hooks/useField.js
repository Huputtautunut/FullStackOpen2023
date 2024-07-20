import { useState } from 'react';

/**
 * Custom hook to manage the value of a form field.
 * @param {string} type - The type of the input field (e.g., 'text', 'password', etc.).
 * @returns {object} An object containing the current value, an onChange handler, and the input type.
 */
const useField = (type) => {
  const [value, setValue] = useState('');

  // Handler to update the value state when the input changes
  const onChange = (event) => {
    setValue(event.target.value);
  };

  // Return the props needed to wire up the input field
  return {
    type,
    value,
    onChange,
    reset: () => setValue('') // Optional: add a reset function to clear the field
  };
};

export default useField;
