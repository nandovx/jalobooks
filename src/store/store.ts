import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import bookReducer from "./bookSlice";
import userReducer from "./userSlice";
import loanReducer from "./loanSlice";
import userBooksReducer from "./userBooksSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "books"],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    books: bookReducer,
    user: persistedReducer,
    loans: loanReducer,
    userBooks: userBooksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
