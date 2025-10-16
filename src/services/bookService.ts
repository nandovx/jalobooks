import axios from "axios";
import type { Book } from "../types/book";

const API_BASE = "https://gutendex.com/books";
const BOOKS_KEY = "books";

export const getBooks = async (
  query: string,
  sort: "popular" | "ascending" = "popular"
) => {
  try {
    const saved = localStorage.getItem(BOOKS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }

    const response = await axios.get(API_BASE, {
      params: query ? { search: query } : { sort },
    });

    const booksWithDefaults = response.data.results.map((book: Book) => ({
      ...book,
      borrowed: book.borrowed ?? false,
    }));

    localStorage.setItem(BOOKS_KEY, JSON.stringify(booksWithDefaults));

    return booksWithDefaults;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return [];
  }
};

export const updateBooks = (books: Book[]) => {
  try {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  } catch (e) {
    console.error("Failed to save books to localStorage:", e);
  }
};
