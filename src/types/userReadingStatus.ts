export interface UserReadingStatus {
  userId: string;
  bookId: number;
  status: "reading" | "completed" | "wishlist";
}
