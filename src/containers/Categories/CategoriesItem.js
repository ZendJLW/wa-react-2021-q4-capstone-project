import "./CategoriesItem.css";
import {NavLink} from "react-router-dom";
import React from "react";
import Categories from "../../mocks/en-us/product-categories.json";

const CategoriesItem = function ({index}) {
  const categoriesIndex = index;
  /* const {isLoading} = Categories;

  if (isLoading) {
    return <h1>Loading...</h1>;
  } */
  // eslint-disable-next-line no-param-reassign
  // const categories = Categories.data;

  const category = Categories.results[categoriesIndex];
  const categoryName = category.data.name;
  const categoryId = category.id;
  const categoryImg = category.data.main_image.url;
  const categoryImgAlt = category.data.main_image.alt;

  return (
    <div className="categoryItem">
      <table className="categorytable">
        <tbody>
          <tr>
            <td className="categoria">
              <NavLink to={`/ProductList/${categoryId}`}>
                <img src={categoryImg} alt={categoryImgAlt} className="logo" />
              </NavLink>
            </td>
          </tr>
          <tr>
            <td>
              <h1> {categoryName} </h1>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesItem;
