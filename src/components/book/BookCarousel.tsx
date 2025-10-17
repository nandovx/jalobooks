import React from "react";
import BookCard from "./BookCard";
import type { Book } from "../../types/book";
import styles from "./BookCarousel.module.css";
import type { IconType } from "react-icons/lib";

interface Props {
  books: Book[];
  context: "loan" | "reservation" | "wishlist";
  title: string;
  icon?: IconType | React.ComponentType;
}

const BookCarousel: React.FC<Props> = ({
  books,
  context,
  title,
  icon: IconComponent,
}) => {
  if (books.length === 0) {
    return (
      <div className={styles.carouselContainer}>
        <h2 className={styles.title}>
          {IconComponent && <IconComponent className={styles.titleIcon} />}
          {title}
        </h2>
        <p className={styles.noBooks}>
          Any books here. {""} {":("}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.carouselContainer}>
      {IconComponent && <IconComponent className={styles.titleIcon} />}
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
