import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "./types";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  authError: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
      state.authError = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.authError = null;
    },
    loginError(state, action: PayloadAction<string>) {
      state.authError = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
});

export const { login, logout, loginError, setUser } = authSlice.actions;
