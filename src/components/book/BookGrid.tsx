import React from "react";
import type { Book } from "../../types/book";
import BookCard from "./BookCard";
import styles from "./BookGrid.module.css";
import type { IconType } from "react-icons/lib";

interface BookGridProps {
  title: string;
  books: Book[];
  icon?: IconType | React.ComponentType;
}

const BookGrid: React.FC<BookGridProps> = ({
  title,
  books,
  icon: IconComponent,
}) => {
  return (
    <section className={styles.gridContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>
          {IconComponent && <IconComponent className={styles.titleIcon} />}
          {title}
        </h2>
      </div>
      <div className={styles.grid}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default BookGrid;
