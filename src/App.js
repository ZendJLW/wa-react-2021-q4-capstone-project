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
  const itemsPerPage = 8; // itemsPerPage
  // const products = useFeaturedProducts();
  const cartProducts = [];

  const {data: banners, isLoading: bannersIsLoading} = useFeaturedBanners();
  const {data: products, isLoading: productsIsLoading} = useFeaturedProducts();
  const {data: cats, isLoading: categoriesIsLoading} = useFeaturedCategories();

  if (bannersIsLoading) {
    return <h1>Loading...</h1>;
  }

  if (productsIsLoading) {
    return <h1>Loading...</h1>;
  }

  if (categoriesIsLoading) {
    return <h1>Loading...</h1>;
  }
  console.log(cats, categoriesIsLoading, bannersIsLoading);
  const categories = getCategories(cats);

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
                  Banners={banners}
                  Categories={categories}
                  Products={products}
                />
              }
            />
            <Route
              path="/home"
              element={
                <Home
                  Banners={banners}
                  Categories={categories}
                  Products={products}
                />
              }
            />

            {["/ProductList", "/Products"].map(path => (
              <Route
                path={path}
                element={
                  <ProductListPage
                    Categories={categories}
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
                      Categories={categories}
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
              element={<SearchPage Products={products} />}
            />

            <Route path="/cart" element={<CartPage />} />

            <Route path="/checkout" element={<Checkout />} />

            <Route
              path="/Product"
              element={<ProductPage Products={products} />}
            >
              <Route path=":id" element={<ProductPage Products={products} />} />
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
