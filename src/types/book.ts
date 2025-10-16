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

  borrowed: boolean;
  borrowedAt?: string;
  dueDate?: string;
}

export interface Person {
  birth_year: number | null;
  death_year: number | null;
  name: string;
}

export interface Format {
  [mimeType: string]: string;
}
