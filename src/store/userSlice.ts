import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { User } from "../types";

// Função para obter o usuário do localStorage
const getCurrentUserFromStorage = (): User | null => {
  const stored = localStorage.getItem("currentUser");
  return stored ? JSON.parse(stored) : null;
};

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = (() => {
  const user = getCurrentUserFromStorage();
  return {
    currentUser: user,
    isAuthenticated: !!user,
  };
})();

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
