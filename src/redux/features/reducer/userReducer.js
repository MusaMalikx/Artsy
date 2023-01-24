import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    admin: false,
    buyer: false,
    artist: false
  },
  signedIn: false,
  users: []
};

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
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser, logout, setUsers } = userReducer.actions;
export const selectUser = (state) => state.user.user;
export const selectSignedIn = (state) => state.user.signedIn;
export const selectUsers = (state) => state.user.users;
export default userReducer.reducer;
