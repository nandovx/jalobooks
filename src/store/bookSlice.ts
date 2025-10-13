import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { searchBooks } from "../services/bookService";
import type { Book } from "../types";

const BOOKS_KEY = "books";

// ✅ Action para carregar livros do localStorage
export const loadBooksFromStorage = createAsyncThunk(
  "books/loadFromStorage",
  async () => {
    const saved = localStorage.getItem(BOOKS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }

    // Se não tiver no localStorage, buscar da API e salvar
    const data = await searchBooks("", "popular");
    const booksWithDefaults = data.map((book: Book) => ({
      ...book,
      borrowed: book.borrowed ?? false,
    }));

    localStorage.setItem(BOOKS_KEY, JSON.stringify(booksWithDefaults));
    return booksWithDefaults;
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    items: [] as Book[],
    status: "idle",
    error: null as string | null,
  },
  reducers: {
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.items.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;

        // ✅ Sincroniza com o localStorage
        const updatedBooks = state.items.map((book) =>
          book.id === action.payload.id ? action.payload : book
        );
        localStorage.setItem(BOOKS_KEY, JSON.stringify(updatedBooks));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooksFromStorage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadBooksFromStorage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadBooksFromStorage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Erro ao carregar livros";
      });
  },
});

export const { updateBook } = bookSlice.actions;

export default bookSlice.reducer;
