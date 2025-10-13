import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./store";
import type { Book } from "../types";
import type { Loan, Reservation, UserReadingStatus } from "../types";

// Tipos para o estado do slice
interface UserBooksState {
  borrowedBooks: Book[];
  reservedBooks: Book[];
  wishlistBooks: Book[];
}

// Estado inicial
const initialState: UserBooksState = {
  borrowedBooks: [],
  reservedBooks: [],
  wishlistBooks: [],
};

// Slice
const userBooksSlice = createSlice({
  name: "userBooks",
  initialState,
  reducers: {
    // Ações para atualizar as listas (serão chamadas por outros slices)
    updateBorrowedBooks: (state, action: PayloadAction<Book[]>) => {
      state.borrowedBooks = action.payload;
    },
    updateReservedBooks: (state, action: PayloadAction<Book[]>) => {
      state.reservedBooks = action.payload;
    },
    updateWishlistBooks: (state, action: PayloadAction<Book[]>) => {
      state.wishlistBooks = action.payload;
    },
  },
});

export const { updateBorrowedBooks, updateReservedBooks, updateWishlistBooks } =
  userBooksSlice.actions;

export default userBooksSlice.reducer;

// Selectors para calcular as listas automaticamente
export const selectBorrowedBooks = createSelector(
  [
    (state: RootState) => state.books.items,
    (state: RootState) => state.loans.loans, // ✅ Correto: state.loans.loans
    (state: RootState) => state.user.currentUser?.id,
  ],
  (books, loans, userId) => {
    if (!userId) return [];
    return books.filter((book) =>
      loans.some(
        (
          loan: Loan // ✅ Tipagem correta
        ) => loan.bookId === book.id && loan.userId === userId && !loan.returned
      )
    );
  }
);

export const selectReservedBooks = createSelector(
  [
    (state: RootState) => state.books.items,
    (state: RootState) => state.loans.reservations, // ✅ Correto: state.loans.reservations
    (state: RootState) => state.user.currentUser?.id,
  ],
  (books, reservations, userId) => {
    if (!userId) return [];
    return books.filter((book) =>
      reservations.some(
        (
          res: Reservation // ✅ Tipagem correta
        ) => res.bookId === book.id && res.userId === userId
      )
    );
  }
);

export const selectWishlistBooks = createSelector(
  [
    (state: RootState) => state.books.items,
    (state: RootState) => state.loans.status, // ✅ Correto: state.loans.status
    (state: RootState) => state.user.currentUser?.id,
  ],
  (books, status, userId) => {
    if (!userId) return [];
    return books.filter((book) =>
      status.some(
        (
          s: UserReadingStatus // ✅ Tipagem correta
        ) =>
          s.bookId === book.id && s.userId === userId && s.status === "wishlist"
      )
    );
  }
);
