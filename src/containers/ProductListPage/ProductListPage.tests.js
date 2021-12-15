/* eslint-disable spaced-comment */
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import {rest} from "msw";
import {setupServer} from "msw/node";
import ProductListPage from "./ProductListPage";
//import BannerSlider from './BannerSlider';
import products from "../../mocks/en-us/featured-products.json";
import categories from "../../mocks/en-us/product-categories.json";
import {getCategories} from "../../utils/getData";
import {CartProvider} from "../../context/CartContext";
// Banners
// https://wizeline-academy.cdn.prismic.io/api/v2/documents/search?ref=YZaBvBIAACgAvnOP&q=%5B%5Bat(document.type%2C%20%22banner%22)%5D%5D&lang=en-us&pageSize=5
// Categorias
// https://wizeline-academy.cdn.prismic.io/api/v2/documents/search?ref=YZaBvBIAACgAvnOP&q=%5B%5Bat(document.type%2C%20%22category%22)%5D%5D&lang=en-us&pageSize=30
// Productos
// https://wizeline-academy.cdn.prismic.io/api/v2/documents/search?ref=YZaBvBIAACgAvnOP&q=%5B%5Bat(document.type%2C%20%22product%22)%5D%5D&q=%5B%5Bat(document.tags%2C%20%5B%22Featured%22%5D)%5D%5D&lang=en-us&pageSize=16

const productsResponse = rest.get(
  "https://wizeline-academy.cdn.prismic.io/api/v2/documents/search?ref=YZaBvBIAACgAvnOP&q=%5B%5Bat(document.type%2C%20%22banner%22)%5D%5D&lang=en-us&pageSize=5",
  (req, res, ctx) =>
    res(
      ctx.json([
        {
          id: "YZZ_XhIAAC0AvmiA",
          data: {
            name: "Fair Isle Snowflake Lumbar Cushion Cover",
            category: {
              id: "YWHyYRIAACgAykCq",
              type: "category",
            },
          },
        },
      ]),
    ),
);

const categoriesResponse = rest.get("", (req, res, ctx) =>
  res(
    ctx.json([
      {
        id: "YWHyYRIAACgAykCq",
        data: {
          name: "Decorate",
        },
      },
    ]),
  ),
);

const handlers = [productsResponse, categoriesResponse];
// eslint-disable-next-line new-cap
const server = new setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("App", () => {
  it("pagination", async () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route
              path="ProductList"
              element={<ProductListPage cartProducts={[]} />}
            />
          </Routes>
        </CartProvider>
      </BrowserRouter>,
    );
    await expect(
      screen.findByText(/Fair Isle Snowflake Lumbar Cushion Cover/i),
    ).toBeVisible();
  });
});
