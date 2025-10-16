import { useAppSelector, useAppDispatch } from "../store/hooks";
import { addLoan, removeLoan } from "../store/loanSlice";
import type { Loan } from "../types/loan";

export const useUserLoans = () => {
  const dispatch = useAppDispatch();
  const loans = useAppSelector((state) => state.loans.loans);

  const addLoanToUser = (loan: Loan) => {
    dispatch(addLoan(loan));
  };

  const removeLoanFromUser = (bookId: number) => {
    dispatch(removeLoan(bookId));
  };

  return { loans, addLoan: addLoanToUser, returnBook: removeLoanFromUser };
};
