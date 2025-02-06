import { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, Store } from "@reduxjs/toolkit";
import { BookCard } from "../components/BookCard";
import cartReducer, { updateQuantity } from "../store/cartSlice";
import { CartItem } from "../types";

const mockBook = {
  id: 1,
  title: "Test Book",
  author: "Test Author",
  price: 29.99,
  stock: 5,
  originalStock: 5,
};

const createTestStore = (initialCartItems: CartItem[] = []): Store => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: initialCartItems,
        total: 0,
        isOpen: true,
      },
    },
  });
};

describe("BookCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders book information correctly", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <BookCard book={mockBook} />
      </Provider>
    );

    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    expect(screen.getByText(mockBook.author)).toBeInTheDocument();
    expect(screen.getByText(mockBook.price.toString())).toBeInTheDocument();
    expect(screen.getByText(`Stock: ${mockBook.stock}`)).toBeInTheDocument();
  });

  it("handles adding item to cart successfully", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <BookCard book={mockBook} />
      </Provider>
    );

    const addToCartButton = screen.getByText("Add to cart");
    fireEvent.click(addToCartButton);

    expect(store.getState().cart.items).toHaveLength(1);
    expect(store.getState().cart.items[0]).toEqual({
      book: {
        ...mockBook,
        stock: mockBook.stock - 1,
        originalStock: mockBook.stock,
      },
      quantity: 1,
    });
  });

  it("prevents adding more items than available stock", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <BookCard book={{ ...mockBook, stock: 4 }} />
      </Provider>
    );

    const addToCartButton = screen.getByText("Add to cart");

    Array.from({ length: 5 }).forEach(() => {
      fireEvent.click(addToCartButton);
    });

    expect(store.getState().cart.items[0].quantity).toBe(4);
  });

  it("disables add to cart button when stock is 0", () => {
    const bookWithNoStock = { ...mockBook, stock: 0 };
    const store = createTestStore();

    render(
      <Provider store={store}>
        <BookCard book={bookWithNoStock} />
      </Provider>
    );

    const addToCartButton = screen.getByText("Add to cart");
    expect(addToCartButton).toBeDisabled();
  });

  it("updates quantity when using stepper field", async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <BookCard book={mockBook} />
      </Provider>
    );

    const addToCartButton = screen.getByText("Add to cart");
    fireEvent.click(addToCartButton);

    const bookId = mockBook.id;
    await act(() => store.dispatch(updateQuantity({ bookId, quantity: 3 })));

    expect(store.getState().cart.items[0]?.quantity).toBe(3);
  });

  it("shows correct stock when item is already in cart", () => {
    const cartItems = [{ book: mockBook, quantity: 2 }];
    const store = createTestStore(cartItems);

    render(
      <Provider store={store}>
        <BookCard book={mockBook} />
      </Provider>
    );

    expect(screen.getByText("Stock: 3")).toBeInTheDocument();
  });
});
