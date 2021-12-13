import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import {useFeaturedBanners} from "./utils/hooks/useFeaturedBanners";
import Footer from "./containers/Banner/Footer";
import Header from "./containers/Header/Header";
import Home from "./containers/Home/Home";
import {getCategories} from "./utils/getData";
import ProductListPage from "./containers/ProductListPage/ProductListPage";
import {useFeaturedCategories} from "./utils/hooks/useFeaturedCategories";
import {useFeaturedProducts} from "./utils/hooks/useFeaturedProducts";
import ProductPage from "./containers/ProductPage/ProductPage";
import SearchPage from "./containers/SearchPage/SearchPage";
import {CartProvider} from "./context/CartContext";
import CartPage from "./containers/CartPage/CartPage";
import Checkout from "./containers/Checkout/Checkout";

const App = function () {
  const itemsPerPage = 12; // itemsPerPage
  const products = useFeaturedProducts();
  const cartProducts = [];
  return (
    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
      <BrowserRouter>
        <CartProvider>
          <Header title="MugiStore!" img_alt="MugiStore!" />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  Banners={useFeaturedBanners()}
                  Categories={useFeaturedCategories()}
                  Products={useFeaturedProducts()}
                />
              }
            />
            <Route
              path="/home"
              element={
                <Home
                  Banners={useFeaturedBanners()}
                  Categories={useFeaturedCategories()}
                  Products={useFeaturedProducts()}
                />
              }
            />

            {["/ProductList", "/Products"].map(path => (
              <Route
                path={path}
                element={
                  <ProductListPage
                    Categories={getCategories()}
                    Products={products}
                    itemsPerPage={itemsPerPage}
                    cartProducts={cartProducts}
                  />
                }
                width="100%"
              >
                <Route
                  path=":id"
                  element={
                    <ProductListPage
                      Categories={getCategories()}
                      Products={products}
                      itemsPerPage={itemsPerPage}
                      cartProducts={cartProducts}
                    />
                  }
                />
              </Route>
            ))}

            <Route
              path="/search"
              element={<SearchPage Products={useFeaturedProducts()} />}
            />

            <Route path="/cart" element={<CartPage />} />

            <Route path="/checkout" element={<Checkout />} />

            <Route
              path="/Product"
              element={<ProductPage Products={useFeaturedProducts()} />}
            >
              <Route
                path=":id"
                element={<ProductPage Products={useFeaturedProducts()} />}
              />
            </Route>

            <Route
              path="*"
              element={
                <div>
                  <h1>Error 404. Page Not Found.</h1>
                </div>
              }
            />
          </Routes>
        </CartProvider>
      </BrowserRouter>
      <Footer text="Ecommerce created during Wizeline’s Academy React Bootcamp" />
    </div>
  );
};

export default App;
