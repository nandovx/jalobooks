import { useAppSelector, useAppDispatch } from "../store/hooks";
import { addReservation, removeReservation } from "../store/loanSlice";
import type { Reservation } from "../types/reservation";

export const useUserReservations = () => {
  const dispatch = useAppDispatch();
  const reservations = useAppSelector((state) => state.loans.reservations);

  const addReservationToUser = (reservation: Reservation) => {
    dispatch(addReservation(reservation));
  };

  const removeReservationFromUser = (bookId: number) => {
    dispatch(removeReservation(bookId));
  };

  return {
    reservations,
    addReservation: addReservationToUser,
    cancelReservation: removeReservationFromUser,
  };
};
