export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  stock: number;
  originalStock?: number;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
}
