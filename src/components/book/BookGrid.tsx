import React from "react";
import type { Book } from "../../types/book";
import BookCard from "./BookCard";
import styles from "./BookGrid.module.css";

interface BookGridProps {
  title: string;
  books: Book[];
}

const BookGrid: React.FC<BookGridProps> = ({ title, books }) => {
  return (
    <section className={styles.gridContainer}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default BookGrid;
