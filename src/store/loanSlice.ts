import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Loan, Reservation, UserReadingStatus } from "../types";

// Chaves do localStorage
const LOANS_KEY = "userLoans";
const RESERVATIONS_KEY = "userReservations";
const STATUS_KEY = "userReadingStatus";

// Funções para carregar do localStorage
const loadLoansFromStorage = (): Loan[] => {
  try {
    const stored = localStorage.getItem(LOANS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Erro ao carregar empréstimos do localStorage:", e);
    return [];
  }
};

const loadReservationsFromStorage = (): Reservation[] => {
  try {
    const stored = localStorage.getItem(RESERVATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Erro ao carregar reservas do localStorage:", e);
    return [];
  }
};

const loadStatusFromStorage = (): UserReadingStatus[] => {
  try {
    const stored = localStorage.getItem(STATUS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Erro ao carregar status de leitura do localStorage:", e);
    return [];
  }
};

// Tipos para o estado do slice
interface LoanState {
  loans: Loan[];
  reservations: Reservation[];
  status: UserReadingStatus[];
}

// Estado inicial - carrega do localStorage
const initialState: LoanState = {
  loans: loadLoansFromStorage(),
  reservations: loadReservationsFromStorage(),
  status: loadStatusFromStorage(),
};

// Slice
const loanSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {
    // Ações para empréstimos
    addLoan: (state, action: PayloadAction<Loan>) => {
      state.loans.push(action.payload);
      localStorage.setItem(LOANS_KEY, JSON.stringify(state.loans)); // ✅ Salvar no localStorage
    },
    removeLoan: (state, action: PayloadAction<number>) => {
      state.loans = state.loans.filter(
        (loan) => loan.bookId !== action.payload
      );
      localStorage.setItem(LOANS_KEY, JSON.stringify(state.loans)); // ✅ Salvar no localStorage
    },
    // Ações para reservas
    addReservation: (state, action: PayloadAction<Reservation>) => {
      state.reservations.push(action.payload);
      localStorage.setItem(
        RESERVATIONS_KEY,
        JSON.stringify(state.reservations)
      ); // ✅ Salvar no localStorage
    },
    removeReservation: (state, action: PayloadAction<number>) => {
      state.reservations = state.reservations.filter(
        (res) => res.bookId !== action.payload
      );
      localStorage.setItem(
        RESERVATIONS_KEY,
        JSON.stringify(state.reservations)
      ); // ✅ Salvar no localStorage
    },
    // Ações para status de leitura
    addStatus: (state, action: PayloadAction<UserReadingStatus>) => {
      state.status.push(action.payload);
      localStorage.setItem(STATUS_KEY, JSON.stringify(state.status)); // ✅ Salvar no localStorage
    },
    removeStatus: (state, action: PayloadAction<number>) => {
      state.status = state.status.filter((s) => s.bookId !== action.payload);
      localStorage.setItem(STATUS_KEY, JSON.stringify(state.status)); // ✅ Salvar no localStorage
    },
    // Nova ação: limpar todos os dados do usuário
    clearUserLoansReservationsAndStatus: (state) => {
      state.loans = [];
      state.reservations = [];
      state.status = [];
      // ✅ Limpar do localStorage também
      localStorage.removeItem(LOANS_KEY);
      localStorage.removeItem(RESERVATIONS_KEY);
      localStorage.removeItem(STATUS_KEY);
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
