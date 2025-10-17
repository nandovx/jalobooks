import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import BookActions from "../components/book/BookActions";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const book = useAppSelector((state) =>
    state.books.items.find((b) => b.id === Number(id))
  );

  useEffect(() => {}, [book, dispatch]);

  if (!book) return <p>Loading...</p>;

  const description = book.summaries?.[0] || "Nenhuma descrição disponível.";
  const genre =
    book.subjects.slice(0, 3).join(", ") || "Gênero não especificado.";

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        marginBottom: "1rem",
      }}
    >
      <h1
        style={{
          borderBottom: "2px solid var(--border-color)",
        }}
      >
        {book.title}
      </h1>
      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={
              book.formats["image/jpeg"] ||
              book.formats["image/png"] ||
              "https://placehold.co/128"
            }
            alt={book.title}
            style={{ width: "200px", height: "auto", borderRadius: "8px" }}
          />
        </div>
        <div style={{ padding: "30px" }}>
          <p style={{ display: "flex", flexDirection: "column" }}>
            <strong>Authors:</strong>{" "}
            {book.authors.map((a) => a.name).join(", ")}
          </p>
          <p style={{ display: "flex", flexDirection: "column" }}>
            <strong>Language:</strong> {book.languages.join(", ")}
          </p>
          <p style={{ display: "flex", flexDirection: "column" }}>
            <strong>Assuntos (Gênero):</strong> {genre}
          </p>

          <p style={{ display: "flex", flexDirection: "column" }}>
            <strong>Status de Disponibilidade:</strong>{" "}
            {book.borrowed ? "Indisponível" : "Disponível"}
          </p>
          {book.borrowed && book.dueDate && (
            <p>
              <strong>Devolução:</strong>{" "}
              {new Date(book.dueDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Descrição</h3>
        <p>{description}</p>
      </div>
      <BookActions bookId={book.id} />{" "}
    </div>
  );
};

export default BookDetail;
