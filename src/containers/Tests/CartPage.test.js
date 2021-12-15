/* eslint-disable array-callback-return */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import React, {useContext} from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {BrowserRouter, Route, Routes, MemoryRouter} from "react-router-dom";
import Products from "../../mocks/en-us/featured-products.json";
import Categories from "../../mocks/en-us/product-categories.json";
import {CartProvider} from "../../context/CartContext";
import CartPage from "../CartPage/CartPage";
import Header from "../Header/Header";

describe("Product Page Tests", () => {
  it("Validate that an empty state is displayed when there are no items in the cart", async () => {
    render(
      <CartProvider>
        <BrowserRouter>
          <Header />
          <CartPage />
        </BrowserRouter>
        ,
      </CartProvider>,
    );
    expect(screen.queryByText(/Cart Empty/)).toBeInTheDocument();
  });

  it("Validate that the list of products is shown when there are items in the cart. Each row should contain the main image of the product, its name, unit price, a quantity selector, subtotal and a “remove from cart icon”.", async () => {

    render(
      <CartProvider>
        <BrowserRouter>
          <Header />
          <CartPage />
        </BrowserRouter>
        ,
      </CartProvider>,
    );
    expect(screen.queryByText(/Cart Empty/)).toBeInTheDocument();
    const cartItems = screen.queryAllByTestId("cartItem");
    const cartItemlength = cartItems.length;
    expect(
      screen.queryByText(`${cartItemlength} Items on Cart`),
    ).toBeInTheDocument();

    cartItems.map((item, i) => {
      console.log(item.children[0].children[0].children[0].innerHTML, "aaaaaa");
    });
  });
});
