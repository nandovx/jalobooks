import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { auth } from "../services/authService";
import type { User } from "../types/user";

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

const loadInitialState = (): UserState => {
  const user = auth.getCurrentUser();
  return {
    currentUser: user,
    isAuthenticated: !!user,
  };
};

const initialState: UserState = loadInitialState();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
