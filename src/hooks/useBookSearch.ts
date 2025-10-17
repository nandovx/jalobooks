import { useState, useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import type { Book } from "../types/book";

export const useBookSearch = () => {
  const [query, setQuery] = useState("");
  const books = useAppSelector((state) => state.books.items);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);

  useEffect(() => {
    if (!query) {
      setFilteredBooks(books);
      return;
    }

    const results = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.authors.some((author) =>
          author.name.toLowerCase().includes(query.toLowerCase())
        )
    );

    setFilteredBooks(results);
  }, [query, books]);

  return {
    query,
    setQuery,
    books: filteredBooks,
    status: "succeeded" as const,
  };
};
