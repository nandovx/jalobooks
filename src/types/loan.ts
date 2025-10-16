export interface Loan {
  bookId: number;
  userId: string;
  borrowedAt: string;
  dueDate: string;
  returnedAt?: string;
  returned: boolean;
}
