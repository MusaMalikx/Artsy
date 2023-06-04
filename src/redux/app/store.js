import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/reducer/counterReducer';
import userReducer from '../features/reducer/userReducer';

/*
Redux store component for managing the global state of the React app.
Centralizes the application state, making it accessible across multiple components.
Enables efficient data management, state updates, and seamless communication between components.
*/
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  }
});
