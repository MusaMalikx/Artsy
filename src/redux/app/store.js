import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { signinReducer } from '../features/api/signinReducer';
import { signupReducer } from '../features/api/signupReducer';
import counterReducer from '../features/reducer/counterReducer';
import userReducer from '../features/reducer/userReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    [signinReducer.reducerPath]: signinReducer.reducer,
    [signupReducer.reducerPath]: signupReducer.reducer
    // [apiSlice.reducerPath]: apiSlice.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([signinReducer.middleware, signupReducer.middleware])
});

setupListeners(store.dispatch);
