export interface Book {
  id: number;
  title: string;
  authors: Person[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  download_count: number;
  formats: Format;
  summaries?: string[];

  // Disponibilidade global
  borrowed: boolean;
  borrowedAt?: string;
  dueDate?: string;
}

export interface Loan {
  bookId: number;
  userId: string;
  borrowedAt: string;
  dueDate: string;
  returnedAt?: string;
  returned: boolean;
}

export interface Reservation {
  bookId: number;
  userId: string;
  reservedAt: string;
}

export interface UserReadingStatus {
  userId: string;
  bookId: number;
  status: "reading" | "completed" | "wishlist";
}

export interface Person {
  birth_year: number | null;
  death_year: number | null;
  name: string;
}

export interface Format {
  [mimeType: string]: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  createdAt: string;
}
