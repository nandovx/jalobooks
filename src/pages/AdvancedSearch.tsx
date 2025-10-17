import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import BookGrid from "../components/book/BookGrid";
import styles from "./AdvancedSearch.module.css";

const AdvancedSearch = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [filters, setFilters] = useState({
    query: initialQuery,
    languages: "",
    topic: "",
    sort: "popular" as "popular" | "ascending" | "descending",
  });

  const books = useAppSelector((state) => state.books.items);
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
    setFilters((prev) => ({ ...prev, query: initialQuery }));
  }, [initialQuery]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Advanced Search</h1>
      </header>

      <section className={styles.filtersSection}>
        <h2>Filters</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="searchQuery">Search Query</label>
          <input
            id="searchQuery"
            type="text"
            placeholder="Search by title or author..."
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="languageFilter">Language</label>
          <input
            id="languageFilter"
            type="text"
            placeholder="Filter by language (e.g. en, pt)..."
            value={filters.languages}
            onChange={(e) =>
              setFilters({ ...filters, languages: e.target.value })
            }
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="topicFilter">Topic</label>
          <input
            id="topicFilter"
            type="text"
            placeholder="Filter by topic (e.g. fiction, science)..."
            value={filters.topic}
            onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="sortOrder">Sort Order</label>
          <select
            id="sortOrder"
            value={filters.sort}
            onChange={(e) =>
              setFilters({
                ...filters,
                sort: e.target.value as "popular" | "ascending" | "descending",
              })
            }
          >
            <option value="popular">Sort by Popular</option>
            <option value="ascending">Sort A-Z</option>
            <option value="descending">Sort Z-A</option>
          </select>
        </div>

        <button className={styles.searchButton} onClick={handleSearch}>
          Apply Filters & Search
        </button>
      </section>

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
        className={styles.backButton}
      >
        ← Back to Home
      </a>

      <section className={styles.resultsSection}>
        <BookGrid title="Search Results" books={sortedBooks} />
      </section>
    </div>
  );
};

export default AdvancedSearch;
