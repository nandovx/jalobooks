import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
        display: "flex",
        gap: "10px",
      }}
    >
      <input
        type="text"
        placeholder="Search books..."
        value={inputValue}
        onChange={handleInputChange}
        aria-label="Search for books"
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
