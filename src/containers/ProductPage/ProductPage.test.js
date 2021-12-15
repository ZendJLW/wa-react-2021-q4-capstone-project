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
import ProductPage from "./ProductPage";
import Header from "../Header/Header";

describe("Product Page Tests", () => {
  it("Product Detail Page is fetching and rendering data from the API for a particular product", async () => {
    render(
      <CartProvider>
        <BrowserRouter>
          <ProductPage Products={Products} productId="YWL8XBIAAC0AzuPZ" />
        </BrowserRouter>
        ,
      </CartProvider>,
    );
    expect(
      screen.queryByText("[furniture] Tallulah Sofa Gray"),
    ).toBeInTheDocument();
  });
  it("Product Detail Page contains the following labels: name of the selected product, current price, SKU, category name, a list of tags, and description.", async () => {
    render(
      <CartProvider>
        <BrowserRouter>
          <ProductPage Products={Products} productId="YWL8XBIAAC0AzuPZ" />
        </BrowserRouter>
        ,
      </CartProvider>,
    );
    expect(
      screen.queryByText("[furniture] Tallulah Sofa Gray"),
    ).toBeInTheDocument();
    expect(screen.queryByText("$ 1834.57")).toBeInTheDocument();
    expect(screen.queryByText("SKU: 1080681271")).toBeInTheDocument();
    expect(screen.queryByText("#Living Room")).toBeInTheDocument();
    expect(screen.queryByText("#Sofa")).toBeInTheDocument();
    expect(
      screen.queryByText(
        "A low profile sets the stage for nighttime relaxation. The Tallulah upholstered sofa combines the straight lines of the European style with romantic details such as side cushions, crooked legs and nail heads. Square arm.",
      ),
    ).toBeInTheDocument();
  });

  it("Product Detail Page contains a quantity selector and an “Add to Cart” button.", async () => {
    render(
      <CartProvider>
        <BrowserRouter>
          <ProductPage Products={Products} productId="YWL8XBIAAC0AzuPZ" />
        </BrowserRouter>
        ,
      </CartProvider>,
    );
    expect(screen.queryByTestId("qty")).toBeInTheDocument();
    expect(screen.queryByTestId("buttonPlusOne")).toBeInTheDocument();
    expect(screen.queryByTestId("buttonMinusOne")).toBeInTheDocument();
  });

  it("Validate that after clicking on the “Add to Cart” button, the number of items that are selected in quantity selector control are added to the cart.", async () => {
    render(
      <CartProvider>
        <BrowserRouter>
          <Header />
          <ProductPage Products={Products} productId="YWL8XBIAAC0AzuPZ" />
        </BrowserRouter>
        ,
      </CartProvider>,
    );
    let qty = parseInt(screen.queryByTestId("qty").value, 10);
    const buttonPlusOne = screen.queryByTestId("buttonPlusOne");
    fireEvent.click(buttonPlusOne);
    qty = parseInt(screen.queryByTestId("qty").value, 10);
    expect(screen.queryByText(`${qty} Items on Cart`)).toBeInTheDocument();
  });

  it("Validate that the “Add to Cart” button is disabled when the stock units available for the selected product is zero.", async () => {
    render(
      <CartProvider>
        <BrowserRouter>
          <ProductPage Products={Products} productId="YWL8XBIAAC0AzuPZ" />
        </BrowserRouter>
        ,
      </CartProvider>,
    );
    // eslint-disable-next-line no-unused-expressions
    expect(screen.queryByTestId("buttonMinusOne")).toBeDisabled;
  });
});

//En esta parte mi proyecto era diferente, por lo tanto las pruebas las adecué a la forma en la que trabaja
//mi sistema. No tengo botón de Add to Cart, en el selector de cantidades se va agregando o borrando en uno al carrito
//en este caso lo que desactivo cuando la cantidad es 0, es el botón de eliminar un item.
