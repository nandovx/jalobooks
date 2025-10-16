import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Book } from "../types/book";
import type { Loan } from "../types/loan";
import type { Reservation } from "../types/reservation";
import type { UserReadingStatus } from "../types/userReadingStatus";

interface UserBooksState {
  borrowedBooks: Book[];
  reservedBooks: Book[];
  wishlistBooks: Book[];
}

const initialState: UserBooksState = {
  borrowedBooks: [],
  reservedBooks: [],
  wishlistBooks: [],
};

const userBooksSlice = createSlice({
  name: "userBooks",
  initialState,
  reducers: {
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

// Selectors
export const selectBorrowedBooks = createSelector(
  [
    (state: RootState) => state.books.items,
    (state: RootState) => state.loans.loans,
    (state: RootState) => state.user.currentUser?.id,
  ],
  (books, loans, userId) => {
    if (!userId) return [];
    return books.filter((book) =>
      loans.some(
        (loan: Loan) =>
          loan.bookId === book.id && loan.userId === userId && !loan.returned
      )
    );
  }
);

export const selectReservedBooks = createSelector(
  [
    (state: RootState) => state.books.items,
    (state: RootState) => state.loans.reservations,
    (state: RootState) => state.user.currentUser?.id,
  ],
  (books, reservations, userId) => {
    if (!userId) return [];
    return books.filter((book) =>
      reservations.some(
        (res: Reservation) => res.bookId === book.id && res.userId === userId
      )
    );
  }
);

export const selectWishlistBooks = createSelector(
  [
    (state: RootState) => state.books.items,
    (state: RootState) => state.loans.status,
    (state: RootState) => state.user.currentUser?.id,
  ],
  (books, status, userId) => {
    if (!userId) return [];
    return books.filter((book) =>
      status.some(
        (s: UserReadingStatus) =>
          s.bookId === book.id && s.userId === userId && s.status === "wishlist"
      )
    );
  }
);
