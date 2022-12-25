import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterReducer';
import userReducer from '../features/userReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  }
});
