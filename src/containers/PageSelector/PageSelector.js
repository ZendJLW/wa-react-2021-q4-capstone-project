import React from "react";
import ProductListPage from "../ProductListPage/ProductListPage";
import List from "../productList/ProductList";

const PageSelector = function ({page, Categories}) {
  switch (page) {
    case "ProductListPage":
      return <ProductListPage Categories={Categories} />;
    case "Home":
      return <List />;
    default:
      return <h1>Page Not Found</h1>;
  }
};

export default PageSelector;
