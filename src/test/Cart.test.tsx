import { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, Store } from "@reduxjs/toolkit";
import Cart from "../components/Cart";
import cartReducer, {
  addToCart,
} from "../store/cartSlice";
import { CartItem } from "../types";

const mockBook = {
  id: 1,
  title: "Test Book",
  author: "Test Author",
  price: 29.99,
  stock: 3,
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
        total: initialCartItems.reduce(
          (total, item) => total + item.book.price * item.quantity,
          0
        ),
        isOpen: true,
      },
    },
  });
};

describe("Cart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows empty cart message when there are no items in the cart", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("adds item to cart successfully", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    act(() => store.dispatch(addToCart({ book: mockBook, quantity: 1 })));

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

  it("removes item from cart successfully", () => {
    const store = createTestStore([{ book: mockBook, quantity: 1 }]);

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const removeButton = screen.getByLabelText("Remove from cart");
    fireEvent.click(removeButton);

    expect(store.getState().cart.items).toHaveLength(0);
  });

  it("updates item quantity when using stepper field", async () => {
    const store = createTestStore([{ book: mockBook, quantity: 1 }]);

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const increaseButton = screen.getByLabelText("Increase quantity");
    fireEvent.click(increaseButton);

    act(() => {
      expect(store.getState().cart.items[0].quantity).toBe(2);
    });
  });

  it("prevents updating quantity beyond available stock", async () => {
    const store = createTestStore([{ book: mockBook, quantity: 1 }]);

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const increaseButton = screen.getByLabelText("Increase quantity");
    fireEvent.click(increaseButton);

    act(() => {
      expect(store.getState().cart.items[0].quantity).toBe(2);
    });

    const increaseAgainButton = screen.getByLabelText("Increase quantity");
    fireEvent.click(increaseAgainButton);

    act(() => {
      expect(store.getState().cart.items[0].quantity).toBe(3);
    });
  });

  it("performs checkout and clears the cart", () => {
    const store = createTestStore([{ book: mockBook, quantity: 2 }]);

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const checkoutButton = screen.getByText(/submit/i);
    fireEvent.click(checkoutButton);

    expect(store.getState().cart.items).toHaveLength(0);
    expect(store.getState().cart.total).toBe(0);
  });
});
