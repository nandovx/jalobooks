import SearchBar from "../components/common/SearchBar";
import BookGrid from "../components/book/BookGrid";
import { useBookSearch } from "../hooks/useBookSearch";
import styles from "./Home.module.css";

const Home = () => {
  const { query, setQuery, books } = useBookSearch();

  const recentBooks = books.slice(0, 10);
  const alphabeticalBooks = [...books].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div className={styles.page}>
      <SearchBar query={query} setQuery={setQuery} />
      <BookGrid title="Popular Books" books={recentBooks} />
      <BookGrid title="Books (A-Z)" books={alphabeticalBooks} />
    </div>
  );
};

export default Home;
