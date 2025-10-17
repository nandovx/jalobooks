import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateBook } from "../../store/bookSlice";
import { useUserLoans } from "../../hooks/useUserLoans";
import { useUserReservations } from "../../hooks/useUserReservations";
import { useUserReadingStatus } from "../../hooks/useUserReadingStatus";
import type { Book } from "../../types/book";
import styles from "./BookCard.module.css";

interface Props {
  book: Book;
  context?: "loan" | "reservation" | "wishlist";
}

const BookCard: React.FC<Props> = ({ book, context }) => {
  const dispatch = useAppDispatch();
  const { returnBook } = useUserLoans();
  const { cancelReservation } = useUserReservations();
  const { updateStatus } = useUserReadingStatus();
  const { currentUser } = useAppSelector((state) => state.user);

  const title = book.title;
  const authors =
    book.authors.map((a) => a.name).join(", ") || "Autor desconhecido";
  const image =
    book.formats["image/jpeg"] ||
    book.formats["image/png"] ||
    "https://placehold.co/128";

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

  const handleCancelReservation = () => {
    cancelReservation(book.id);
  };

  const handleRemoveFromWishlist = () => {
    if (currentUser) updateStatus(book.id, currentUser?.id, "none");
  };

  return (
    <div className={styles.card}>
      <Link to={`/book/${book.id}`} className={styles.linkArea}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>{authors}</p>
        <div className={styles.imageContainer}>
          <img src={image} alt={title} className={styles.image} />
        </div>
      </Link>

      <Link to={`/book/${book.id}`} className={styles.link}>
        See Details
      </Link>

      {context === "loan" && (
        <button onClick={handleReturn} className={styles.returnButton}>
          Return
        </button>
      )}
      {context === "reservation" && (
        <button
          onClick={handleCancelReservation}
          className={styles.cancelButton}
        >
          Cancel Reservation
        </button>
      )}
      {context === "wishlist" && (
        <button
          onClick={handleRemoveFromWishlist}
          className={styles.removeButton}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default BookCard;
