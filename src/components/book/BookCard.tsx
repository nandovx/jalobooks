import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateBook } from "../../store/bookSlice";
import { useUserLoans } from "../../hooks/useUserLoans";
import { useUserReservations } from "../../hooks/useUserReservations";
import { useUserReadingStatus } from "../../hooks/useUserReadingStatus";
import type { Book } from "../../types";

interface Props {
  book: Book;
  context: "loan" | "reservation" | "wishlist";
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
    "https://placehold.co/128  ";

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
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        textAlign: "center",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: "100%", height: "auto", borderRadius: "4px" }}
      />
      <h3 style={{ margin: "10px 0" }}>{title}</h3>
      <p style={{ margin: "5px 0", color: "#555" }}>{authors}</p>

      <Link
        to={`/book/${book.id}`}
        style={{
          color: "#007bff",
          textDecoration: "none",
          display: "block",
          marginBottom: "10px",
        }}
      >
        Ver detalhes
      </Link>

      {/* Botões condicionais com base no contexto */}
      {context === "loan" && (
        <button
          onClick={handleReturn}
          style={{
            padding: "5px 10px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Devolver
        </button>
      )}
      {context === "reservation" && (
        <button
          onClick={handleCancelReservation}
          style={{
            padding: "5px 10px",
            backgroundColor: "#ffc107",
            color: "black",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Cancelar Reserva
        </button>
      )}
      {context === "wishlist" && (
        <button
          onClick={handleRemoveFromWishlist}
          style={{
            padding: "5px 10px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Remover
        </button>
      )}
    </div>
  );
};

export default BookCard;
