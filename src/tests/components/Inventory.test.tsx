// tests/components/Inventory.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store/store";
import Inventory from "../../components/Inventory";
import { configureStore, Store, UnknownAction } from "@reduxjs/toolkit";
import inventoryReducer from "../../features/inventory/inventorySlice";

// Mock crypto for testing environment
Object.defineProperty(window, "crypto", {
  value: {
    getRandomValues: (array: ArrayBufferView) => {
      const bytes = new Uint8Array(array.byteLength);
      for (let i = 0; i < bytes.length; i++) {
        bytes[i] = Math.floor(Math.random() * 256);
      }
      return array;
    },
  },
});
const renderWithStore = (store: Store<unknown, UnknownAction, unknown>) => {
  return render(
    <Provider store={store}>
      <Inventory />
    </Provider>
  );
};

test("renders Inventory Management title", async () => {
  render(
    <Provider store={store}>
      <Inventory />
    </Provider>
  );

  // Use findByText to wait for the element to appear
  expect(await screen.findByText(/Inventory Management/i)).toBeInTheDocument();
});

// // Helper function to render the component with a custom store

test("renders loading state", () => {
  const store = configureStore({
    reducer: { inventory: inventoryReducer },
    preloadedState: { inventory: { items: [], loading: true, error: null } },
  });

  renderWithStore(store);

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});
test("renders error state", async () => {
  const store = configureStore({
    reducer: { inventory: inventoryReducer },
    preloadedState: {
      inventory: {
        items: [],
        loading: false,
        error: "Error fetching items",
      },
    },
  });

  renderWithStore(store);
  expect(
    await screen.findByText(/Error: Error fetching items/i)
  ).toBeInTheDocument();
});
