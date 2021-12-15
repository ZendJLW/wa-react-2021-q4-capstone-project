/* eslint-disable array-callback-return */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {BrowserRouter, Route, Routes, MemoryRouter} from "react-router-dom";
import Products from "../../mocks/en-us/featured-products.json";
import Categories from "../../mocks/en-us/product-categories.json";
import {CartProvider} from "../../context/CartContext";
import SearchPage from "../SearchPage/SearchPage";
import Header from "../Header/Header";

describe("Product Page Tests", () => {
  it("Validate that the list of results is rendering data according to the “searchTerm” provided", async () => {
    const searchTerm = "tal";
    render(
      <CartProvider>
        <BrowserRouter>
          <SearchPage Products={Products} q={searchTerm} />
        </BrowserRouter>
        ,
      </CartProvider>,
    );
    const items = screen.queryAllByTestId("item");
    items.map((item, i) => {
      expect(item.children[0].children[0].children[0].innerHTML).toMatch(
        /tal/i,
      );
      expect(item.children[0].children[0].children[0].innerHTML).not.toMatch(
        /ijasdouabsoud/i,
      );
    });
  });

  it("Validate that an empty state is displayed when there are no results for the “searchTerm” provided.", async () => {
    const searchTerm = "asfasjabcoabc";
    render(
      <CartProvider>
        <BrowserRouter>
          <SearchPage Products={Products} q={searchTerm} />
        </BrowserRouter>
        ,
      </CartProvider>,
    );
    expect(screen.queryByText(/Not Matches Found/)).toBeInTheDocument();
  });
});
