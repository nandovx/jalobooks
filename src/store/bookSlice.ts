import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { getBooks, updateBooks } from "../services/bookService";
import type { Book } from "../types/book";

export const loadBooks = createAsyncThunk("books/load", async () => {
  const data = await getBooks("", "popular");
  return data;
});

interface BookState {
  items: Book[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BookState = {
  items: [],
  status: "idle",
  error: null,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.items.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;

        const updatedBooks = state.items.map((book) =>
          book.id === action.payload.id ? action.payload : book
        );
        updateBooks(updatedBooks);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Erro ao carregar livros";
      });
  },
});

export const { updateBook } = bookSlice.actions;

export default bookSlice.reducer;
