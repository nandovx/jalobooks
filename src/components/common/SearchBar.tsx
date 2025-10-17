import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(query);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setQuery(inputValue);
    navigate(`/search?q=${encodeURIComponent(inputValue)}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Link to="/search" className={styles.mobButton}>
          <h1 className={styles.title}>
            <FaMagnifyingGlass />
            Searching any book?
          </h1>
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search books..."
          value={inputValue}
          onChange={handleInputChange}
          aria-label="Search for books"
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
