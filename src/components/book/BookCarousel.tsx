import React from "react";
import BookCard from "./BookCard";
import type { Book } from "../../types/book";
import styles from "./BookCarousel.module.css";

interface Props {
  books: Book[];
  context: "loan" | "reservation" | "wishlist";
  title: string;
}

const BookCarousel: React.FC<Props> = ({ books, context, title }) => {
  if (books.length === 0) {
    return (
      <div className={styles.carouselContainer}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.noBooks}>Você não tem livros.</p>
      </div>
    );
  }

  return (
    <div className={styles.carouselContainer}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.carousel}>
        {books.map((book) => (
          <BookCard book={book} context={context} />
        ))}
      </div>
    </div>
  );
};

export default BookCarousel;
