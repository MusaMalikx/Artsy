import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/reducer/counterReducer';
import userReducer from '../features/reducer/userReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  }
});
