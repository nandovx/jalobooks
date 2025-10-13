import React from "react";
import type { Book } from "../../types";
import BookCard from "./BookCard";

interface BookGridProps {
  title: string;
  books: Book[];
}

const BookGrid: React.FC<BookGridProps> = ({ title, books }) => {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2>{title}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default BookGrid;
