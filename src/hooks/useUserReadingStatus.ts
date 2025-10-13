import { useAppSelector, useAppDispatch } from "../store/hooks";
import { addStatus, removeStatus } from "../store/loanSlice";

export const useUserReadingStatus = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.loans.status);

  const updateStatusForUser = (
    bookId: number,
    userId: string,
    status: "reading" | "completed" | "wishlist" | "none"
  ) => {
    if (status === "none") {
      dispatch(removeStatus(bookId));
    } else {
      dispatch(addStatus({ bookId, userId, status })); // Você precisa passar o userId
    }
  };

  return { status, updateStatus: updateStatusForUser };
};
