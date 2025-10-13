import React from "react";
import SearchBar from "../components/common/SearchBar";
import BookGrid from "../components/book/BookGrid";
import { useBookSearch } from "../hooks/useBookSearch";

const Home = () => {
  const { query, setQuery, books } = useBookSearch();

  const recentBooks = books.slice(0, 10);
  const alphabeticalBooks = [...books].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "1rem" }}>Searching any book?</h1>
      <SearchBar query={query} setQuery={setQuery} />

      <BookGrid title="Popular Books" books={recentBooks} />
      <BookGrid title="Books (A-Z)" books={alphabeticalBooks} />
    </div>
  );
};

export default Home;
