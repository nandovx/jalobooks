import axios from "axios";

const API_BASE = "https://gutendex.com/books";

export const searchBooks = async (
  query: string,
  sort: "popular" | "ascending" = "popular"
) => {
  try {
    const response = await axios.get(API_BASE, {
      params: query ? { search: query } : { sort },
    });
    return response.data.results || [];
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return [];
  }
};

export const getBookById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar livro por ID:", error);
    return null;
  }
};

export const searchBooksByLanguage = async (
  query: string,
  language: string
) => {
  const response = await axios.get(API_BASE, {
    params: { search: query, languages: language },
  });
  return response.data.results || [];
};
