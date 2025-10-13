import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateBook } from "../../store/bookSlice";
import { useUserLoans } from "../../hooks/useUserLoans";
import { useUserReservations } from "../../hooks/useUserReservations";
import { useUserReadingStatus } from "../../hooks/useUserReadingStatus";
import styles from "./BookActions.module.css";

interface BookActionsProps {
  bookId: number;
}

const BookActions: React.FC<BookActionsProps> = ({ bookId }) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const book = useAppSelector((state) =>
    state.books.items.find((b) => b.id === bookId)
  );

  const { loans, addLoan, returnBook } = useUserLoans();
  const { reservations, addReservation, cancelReservation } =
    useUserReservations();
  const { status, updateStatus } = useUserReadingStatus();

  if (!currentUser || !book) {
    console.log("currentUser ou book não encontrado", { currentUser, book });
    return null;
  }

  const userLoan = loans.find(
    (loan) =>
      loan.bookId === book.id &&
      loan.userId === currentUser.id &&
      !loan.returned
  );
  const userReservation = reservations.find(
    (res) => res.bookId === book.id && res.userId === currentUser.id
  );

  // Verificar se o livro está reservado por **alguém**
  const isReservedBySomeone = reservations.some(
    (res) => res.bookId === book.id
  );

  // Verificar se o usuário logado está na **frente da fila de reserva**
  const isNextInQueue = () => {
    const sortedReservations = [...reservations]
      .filter((res) => res.bookId === book.id)
      .sort(
        (a, b) =>
          new Date(a.reservedAt).getTime() - new Date(b.reservedAt).getTime()
      );

    return sortedReservations[0]?.userId === currentUser.id;
  };

  // Verificar o status atual do livro para o usuário
  const currentReadingStatus = status.find(
    (s) => s.bookId === book.id && s.userId === currentUser.id
  )?.status;

  const handleBorrow = () => {
    if (!book.borrowed && (!isReservedBySomeone || isNextInQueue())) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);

      const newLoan = {
        bookId: book.id,
        userId: currentUser.id,
        borrowedAt: new Date().toISOString(),
        dueDate: dueDate.toISOString(),
        returned: false,
      };

      addLoan(newLoan);
      dispatch(
        updateBook({
          ...book,
          borrowed: true,
          borrowedAt: newLoan.borrowedAt,
          dueDate: newLoan.dueDate,
        })
      );
    }
  };

  const handleReturn = () => {
    returnBook(book.id);
    dispatch(
      updateBook({
        ...book,
        borrowed: false,
        borrowedAt: undefined,
        dueDate: undefined,
      })
    );
  };

  const handleReserve = () => {
    if (book.borrowed && !userReservation) {
      const newReservation = {
        bookId: book.id,
        userId: currentUser.id,
        reservedAt: new Date().toISOString(),
      };

      addReservation(newReservation);
    }
  };

  const handleCancelReservation = () => {
    cancelReservation(book.id);
  };

  const handleReadingStatus = (
    newStatus: "reading" | "completed" | "wishlist"
  ) => {
    if (currentReadingStatus === newStatus) {
      // Se o status atual for o mesmo que o novo, remova o status
      updateStatus(book.id, currentUser.id, "none"); // ou crie uma action para remover
    } else {
      updateStatus(book.id, currentUser.id, newStatus);
    }
  };

  return (
    <div className={styles.actions}>
      {!book.borrowed && !userReservation && !userLoan && (
        <button onClick={handleBorrow} className={styles.borrowButton}>
          Emprestar
        </button>
      )}
      {userLoan && (
        <button onClick={handleReturn} className={styles.returnButton}>
          Devolver
        </button>
      )}
      {book.borrowed && !userReservation && !userLoan && (
        <button onClick={handleReserve} className={styles.reserveButton}>
          Reservar
        </button>
      )}
      {userReservation && (
        <button
          onClick={handleCancelReservation}
          className={styles.cancelButton}
        >
          Cancelar Reserva
        </button>
      )}
      {userLoan && (
        <div className={styles.statusDropdown}>
          <label htmlFor="readingStatus">Status de Leitura:</label>
          <select
            id="readingStatus"
            value={currentReadingStatus || ""}
            onChange={(e) => {
              const value = e.target.value as "reading" | "completed";
              if (value) handleReadingStatus(value);
            }}
          >
            <option value="">Selecione...</option>
            <option value="reading">Lendo</option>
            <option value="completed">Concluído</option>
          </select>
        </div>
      )}
      {!userLoan && currentReadingStatus !== "wishlist" && (
        <button
          onClick={() => handleReadingStatus("wishlist")}
          className={styles.wishlistButton}
        >
          Adicionar à Lista de Desejos
        </button>
      )}
      {!userLoan && currentReadingStatus === "wishlist" && (
        <button
          onClick={() => handleReadingStatus("wishlist")}
          className={styles.removeWishlistButton}
        >
          Remover da Lista de Desejos
        </button>
      )}
    </div>
  );
};

export default BookActions;
