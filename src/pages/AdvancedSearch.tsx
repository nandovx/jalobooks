import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import BookGrid from "../components/book/BookGrid";

const AdvancedSearch = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [filters, setFilters] = useState({
    query: initialQuery,
    languages: "",
    topic: "",
    sort: "popular" as "popular" | "ascending" | "descending",
  });

  const books = useAppSelector((state) => state.books.items); // ✅ Pegar livros do Redux
  const navigate = useNavigate();

  const filteredBooks = books.filter((book) => {
    const matchesQuery = filters.query
      ? book.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        book.authors.some((a) =>
          a.name.toLowerCase().includes(filters.query.toLowerCase())
        )
      : true;

    const matchesLanguage = filters.languages
      ? book.languages.includes(filters.languages)
      : true;

    const matchesTopic = filters.topic
      ? book.subjects.some((s) =>
          s.toLowerCase().includes(filters.topic.toLowerCase())
        ) ||
        book.bookshelves.some((b) =>
          b.toLowerCase().includes(filters.topic.toLowerCase())
        )
      : true;

    return matchesQuery && matchesLanguage && matchesTopic;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (filters.sort === "ascending") return a.title.localeCompare(b.title);
    if (filters.sort === "descending") return b.title.localeCompare(a.title);
    if (filters.sort === "popular") return b.download_count - a.download_count;
    return 0;
  });

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(filters.query)}`);
  };

  useEffect(() => {
    // Atualiza o input com o termo da URL
    setFilters((prev) => ({ ...prev, query: initialQuery }));
  }, [initialQuery]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Advanced Search</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={filters.query}
          onChange={(e) => setFilters({ ...filters, query: e.target.value })}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button onClick={handleSearch} style={{ marginBottom: "10px" }}>
          Search
        </button>

        <input
          type="text"
          placeholder="Filter by language (e.g. en, pt)..."
          value={filters.languages}
          onChange={(e) =>
            setFilters({ ...filters, languages: e.target.value })
          }
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Filter by topic (e.g. fiction, science)..."
          value={filters.topic}
          onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <select
          value={filters.sort}
          onChange={(e) =>
            setFilters({
              ...filters,
              sort: e.target.value as "popular" | "ascending" | "descending",
            })
          }
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        >
          <option value="popular">Sort by Popular</option>
          <option value="ascending">Sort A-Z</option>
          <option value="descending">Sort Z-A</option>
        </select>
      </div>

      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 15px",
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back to Home
      </button>

      <BookGrid title="Search Results" books={sortedBooks} />
    </div>
  );
};

export default AdvancedSearch;
