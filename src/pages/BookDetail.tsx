import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import BookActions from "../components/book/BookActions";
import styles from "./BookDetail.module.css";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const book = useAppSelector((state) =>
    state.books.items.find((b) => b.id === Number(id))
  );

  if (!book) return <p className={styles.loadingOrError}>Loading...</p>;

  const description = book.summaries?.[0] || "No description available.";
  const genre = book.subjects.slice(0, 3).join(", ") || "Genre not specified.";

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{book.title}</h1>

      <div className={styles.content}>
        <div className={styles.mediaSection}>
          <div className={styles.imageContainer}>
            <img
              src={
                book.formats["image/jpeg"] ||
                book.formats["image/png"] ||
                "https://placehold.co/128"
              }
              alt={`Cover of ${book.title}`}
              className={styles.coverImage}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/128?text=No+Cover";
              }}
            />
          </div>

          <div className={styles.infoSection}>
            <h2 className={styles.infoTitle}>Book Info</h2>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Authors:</span>
              <span className={styles.infoValue}>
                {book.authors.map((a) => a.name).join(", ")}
              </span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Language:</span>
              <span className={styles.infoValue}>
                {book.languages.join(", ")}
              </span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Subjects (Genre):</span>
              <span className={styles.infoValue}>{genre}</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Availability:</span>
              <span className={styles.infoValue}>
                {book.borrowed ? "Unavailable" : "Available"}
              </span>
            </div>

            {book.borrowed && book.dueDate && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Due Date:</span>
                <span className={styles.infoValue}>
                  {new Date(book.dueDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.descriptionSection}>
          <h2 className={styles.descriptionTitle}>Description</h2>
          <p className={styles.descriptionText}>{description}</p>
        </div>
      </div>

      <div className={styles.actionsContainer}>
        <BookActions bookId={book.id} />
      </div>
    </div>
  );
};

export default BookDetail;
