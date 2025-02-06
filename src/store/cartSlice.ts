import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, CartItem } from "../types";

interface CartState {
  items: CartItem[];
  total: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  total: 0,
  isOpen: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ book: Book; quantity: number }>
    ) => {
      const { book, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.book.id === book.id);

      if (book.stock < quantity) return;

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          book: {
            ...book,
            stock: book.stock - quantity,
            originalStock: book.stock,
          },
          quantity,
        });
      }

      state.total += book.price * quantity;
      state.isOpen = true;
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const bookId = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.book.id === bookId
      );

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];

        item.book.stock += item.quantity;

        state.total -= item.book.price * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ bookId: number; quantity: number }>
    ) => {
      const { bookId, quantity } = action.payload;
      const item = state.items.find((item) => item.book.id === bookId);
      if (!item) return;

      const diff = quantity - item.quantity;
      if (item.book.stock - diff < 0) return;

      item.quantity = quantity;
      item.book.stock -= diff;
      state.total += item.book.price * diff;
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    checkout: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  toggleCart,
  checkout,
} = cartSlice.actions;
export default cartSlice.reducer;
