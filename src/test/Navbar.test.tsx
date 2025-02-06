import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Navbar from "../components/Navbar";
import cartReducer from "../store/cartSlice";
import userReducer from "../store/userSlice";

const createTestStore = (
  userState = { firstName: "", lastName: "", email: "", dateOfBirth: null }
) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      user: userReducer,
    },
    preloadedState: {
      user: { ...userState },
    },
  });
};
describe("Navbar", () => {
  it("renders Navbar with correct links and buttons", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("BookStore")).toBeInTheDocument();
    expect(screen.getByText("Books")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByLabelText("toggle-cart")).toBeInTheDocument();
  });

  it("shows the user's initials in the Profile button if userInitials is provided", async () => {
    const store = createTestStore({
      firstName: "Ana",
      lastName: "Brown",
      email: "",
      dateOfBirth: null,
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const initials = await screen.findByText("AB");
    expect(initials).toBeInTheDocument();
  });

  it("shows an empty avatar when no userInitials are provided", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText("AB")).not.toBeInTheDocument();
  });

  it("dispatches toggleCart action when the cart button is clicked", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const cartButton = screen.getByLabelText("toggle-cart");
    fireEvent.click(cartButton);

    const stateAfterDispatch = store.getState();
    expect(stateAfterDispatch.cart.items).toHaveLength(0);
  });
});
