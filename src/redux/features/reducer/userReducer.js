import { createSlice } from '@reduxjs/toolkit';

//Initial state of user
const initialState = {
  user: {
    admin: false,
    buyer: false,
    artist: false
  },
  signedIn: false
};

//Creating a slice for login and logout of user from the system
export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.signedIn = true;
    },
    logout: (state) => {
      state.user = {
        admin: false,
        buyer: false,
        artist: false
      };
      state.signedIn = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser, logout } = userReducer.actions;
export const selectUser = (state) => state.user.user;
export const selectSignedIn = (state) => state.user.signedIn;
export default userReducer.reducer;
