/* eslint-disable array-callback-return */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import React from "react";
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import Products from "../../mocks/en-us/featured-products.json";
import Categories from "../../mocks/en-us/product-categories.json";
import {CartProvider} from "../../context/CartContext";
import SideBar from "../SideBar/SideBar";
import ProductListPage from "./ProductListPage";
import PaginationBar from "../PaginationBar/PaginationBar";

describe("Product List Page Tests", () => {
  const Cats = [];
  Categories.results.map((element, i) => {
    Cats.push({
      name: element.data.name,
      id: element.id,
      selected: i % 2 !== 0,
    });
  });

  it("Product Category Sidebar is fetching and rendering data from the API", () => {
    render(<SideBar Categories={Cats} />);
    expect(screen.queryByText(/Bed & Bath/i)).toBeInTheDocument();
    expect(screen.queryByText(/Lighting/i)).toBeInTheDocument(); // Selected
    expect(screen.queryByText(/Kitchen/i)).toBeInTheDocument();
    expect(screen.queryByText(/Furniture/i)).toBeInTheDocument(); // Selected
    expect(screen.queryByText(/Decorate & Organize/i)).toBeInTheDocument();
  });

  it("Category links on Product Category Sidebar are filtering Products Grid correctly interacting with the API", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <ProductListPage Categories={Cats} Products={Products} />
        </CartProvider>
      </BrowserRouter>,
    );
    expect(
      screen.queryByText("[furniture]Tallulah Sofa Gray"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("[furniture]Tyler Poly Reclining Leather Armchair"),
    ).toBeInTheDocument();
  });

  it("Pagination Controls are generated correctly based on the number of results fetched from the API and the maximum number of products per page", () => {
    const itemsPerPage = 5;
    render(
      <BrowserRouter>
        <CartProvider>
          <ProductListPage
            Categories={Cats}
            Products={Products}
            itemsPerPage={itemsPerPage}
          />
        </CartProvider>
      </BrowserRouter>,
    );
    const pages = Math.ceil(Products.results.length / itemsPerPage);
    expect(screen.queryAllByTestId("pages").length).toBe(pages);
  });

  it("Prev button is disabled when the user is on the first page", () => {
    const pages = 5;
    const actualPage = 1;
    render(<PaginationBar pages={pages} page={actualPage} />);
    expect(screen.queryByTestId("prev").getAttribute("class")).toBe(
      "isDisabled",
    );
    expect(screen.queryByTestId("next")).toBeEnabled();
  });

  it("Next button is working as expected", () => {
    const pages = 5;
    const actualPage = 4;
    render(<PaginationBar pages={pages} page={actualPage} />);
    expect(screen.queryByTestId("next").getAttribute("href")).toBe(
      `/ProductList/?page=${actualPage + 1}`,
    );
  });

  it("Prev button is working as expected", () => {
    const pages = 5;
    const actualPage = 4;
    render(<PaginationBar pages={pages} page={actualPage} />);
    expect(screen.queryByTestId("prev").getAttribute("href")).toBe(
      `/ProductList/?page=${actualPage - 1}`,
    );
  });

  it("Next button is disabled when the user is on the last page", () => {
    const pages = 5;
    const actualPage = 5;
    render(<PaginationBar pages={pages} page={actualPage} />);
    expect(screen.queryByTestId("prev")).toBeEnabled();
    expect(screen.queryByTestId("next").getAttribute("class")).toBe(
      "isDisabled",
    );
  });
});
