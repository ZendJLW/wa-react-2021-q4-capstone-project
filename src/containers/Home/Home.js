import {NavLink} from "react-router-dom";
import React from "react";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import List from "../productList/ProductList";
import BannerSlider from "../Banner/BannerSlider";

const Home = function ({Banners, Categories, Products}) {
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <div>
        <BannerSlider banners={Banners} />
        <CategoriesSlider categories={Categories} />
        <List Products={Products} />
      </div>
      <div style={{display: "flex", flexDirection: "row"}}>
        <NavLink to="/ProductList">
          <button type="button" className="viewAllProductsButton">
            View all products
          </button>
        </NavLink>
      </div>
    </div>
  );
};
export default Home;
