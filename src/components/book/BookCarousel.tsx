import React from "react";
import BookCard from "./BookCard";
import type { Book } from "../../types";

interface Props {
  books: Book[];
  context: "loan" | "reservation" | "wishlist";
  title: string;
}

const BookCarousel: React.FC<Props> = ({ books, context, title }) => {
  if (books.length === 0) {
    return (
      <div style={{ marginBottom: "30px" }}>
        <h2>{title}</h2>
        <p>Você não tem livros.</p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>{title}</h2>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "20px",
          padding: "10px 0",
          scrollbarWidth: "thin", // Para Firefox
        }}
        className="carousel"
      >
        {books.map((book) => (
          <div key={book.id} style={{ flex: "0 0 auto", width: "200px" }}>
            <BookCard book={book} context={context} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookCarousel;
