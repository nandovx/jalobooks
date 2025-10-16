import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loanService } from "../services/loanService";
import type { Loan, Reservation, UserReadingStatus } from "../types/user";

interface LoanState {
  loans: Loan[];
  reservations: Reservation[];
  status: UserReadingStatus[];
}

const loadInitialState = (): LoanState => ({
  loans: loanService.loadLoans(),
  reservations: loanService.loadReservations(),
  status: loanService.loadStatus(),
});

const initialState: LoanState = loadInitialState();

const loanSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {
    addLoan: (state, action: PayloadAction<Loan>) => {
      state.loans.push(action.payload);
      loanService.saveLoans(state.loans);
    },
    removeLoan: (state, action: PayloadAction<number>) => {
      state.loans = state.loans.filter(
        (loan) => loan.bookId !== action.payload
      );
      loanService.saveLoans(state.loans);
    },
    addReservation: (state, action: PayloadAction<Reservation>) => {
      state.reservations.push(action.payload);
      loanService.saveReservations(state.reservations);
    },
    removeReservation: (state, action: PayloadAction<number>) => {
      state.reservations = state.reservations.filter(
        (res) => res.bookId !== action.payload
      );
      loanService.saveReservations(state.reservations);
    },
    addStatus: (state, action: PayloadAction<UserReadingStatus>) => {
      state.status.push(action.payload);
      loanService.saveStatus(state.status);
    },
    removeStatus: (state, action: PayloadAction<number>) => {
      state.status = state.status.filter((s) => s.bookId !== action.payload);
      loanService.saveStatus(state.status);
    },
    clearUserLoansReservationsAndStatus: (state) => {
      state.loans = [];
      state.reservations = [];
      state.status = [];
      loanService.clearAll();
    },
  },
});

export const {
  addLoan,
  removeLoan,
  addReservation,
  removeReservation,
  addStatus,
  removeStatus,
  clearUserLoansReservationsAndStatus,
} = loanSlice.actions;

export default loanSlice.reducer;
