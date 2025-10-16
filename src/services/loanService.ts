import type { Loan } from "../types/loan";
import type { Reservation } from "../types/reservation";
import type { UserReadingStatus } from "../types/userReadingStatus";

const LOANS_KEY = "userLoans";
const RESERVATIONS_KEY = "userReservations";
const STATUS_KEY = "userReadingStatus";

export const loanService = {
  loadLoans: (): Loan[] => {
    try {
      const stored = localStorage.getItem(LOANS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load loans from localStorage:", e);
      return [];
    }
  },

  saveLoans: (loans: Loan[]) => {
    try {
      localStorage.setItem(LOANS_KEY, JSON.stringify(loans));
    } catch (e) {
      console.error("Failed to save loans to localStorage:", e);
    }
  },

  loadReservations: (): Reservation[] => {
    try {
      const stored = localStorage.getItem(RESERVATIONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load reservations from localStorage:", e);
      return [];
    }
  },

  saveReservations: (reservations: Reservation[]) => {
    try {
      localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));
    } catch (e) {
      console.error("Failed to save reservations to localStorage:", e);
    }
  },

  loadStatus: (): UserReadingStatus[] => {
    try {
      const stored = localStorage.getItem(STATUS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load reading status from localStorage:", e);
      return [];
    }
  },

  saveStatus: (status: UserReadingStatus[]) => {
    try {
      localStorage.setItem(STATUS_KEY, JSON.stringify(status));
    } catch (e) {
      console.error("Failed to save reading status to localStorage:", e);
    }
  },

  clearAll: () => {
    try {
      localStorage.removeItem(LOANS_KEY);
      localStorage.removeItem(RESERVATIONS_KEY);
      localStorage.removeItem(STATUS_KEY);
    } catch (e) {
      console.error("Failed to clear loan data from localStorage:", e);
    }
  },
};
