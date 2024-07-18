import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  timeoutId: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const { message, timeout } = action.payload;

      // Clear existing timeout if there is one
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }

      // Set new notification
      state.message = message;
      state.timeoutId = setTimeout(() => {
        state.message = null;
        state.timeoutId = null;
      }, timeout * 1000); // Convert seconds to milliseconds
    },
    clearNotification(state) {
      state.message = null;
      state.timeoutId = null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;