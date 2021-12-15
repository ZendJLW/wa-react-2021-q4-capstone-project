/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-syntax */
import React, {useContext} from "react";
import "./ProductPage.css";
import {NavLink, useParams} from "react-router-dom";
import CartContext from "../../context/CartContext";
import Button from "../Button/Button";

function getProduct(products, id) {
  for (const i in products) {
    if (products[i].id === id) {
      return products[i];
    }
  }
  return null;
}

const ProductPage = function ({Products, productId}) {
  const {handleProducts} = useContext(CartContext);
  const {getQtyInCart} = useContext(CartContext);
  const params = useParams();
  const idItem = productId || params.id;
  const {results} = Products;
  const product = getProduct(results, idItem);
  if (product === null)
    return (
      <div>
        <h1>Product not Found.</h1>
      </div>
    );
  const title = product.data.name;
  const img = product.data.mainimage.url;
  const desc = product.data.short_description;
  const {price} = product.data;
  const category = product.data.category.slug;
  const {sku} = product.data;
  const {tags} = product;
  const {specs} = product.data;
  const {id} = product;
  const {stock} = product.data;

  const productToHanlde = {
    id,
    title,
    stock,
    category,
    price,
    desc,
    qty: 1,
  };

  return (
    <div className="ProductPageDivRow">
      <div className="productPageCard">
        <div className="productPagetitle">
          <h1 className="productPagetitle">
            [{category}] {title}
          </h1>
          <h1> $ {price}</h1>
        </div>

        <div className="ProductPageDivRow">
          <div>
            <img
              className="productPageitemimg"
              alt="productPageitemimg"
              src={img}
            />
          </div>
          <div className="ProductPageDivColumn">
            <div>
              <h3>
                Description: <p>{desc}</p>
              </h3>
            </div>
            <h3>SKU: {sku}</h3>

            <div>
              <h2>
                Qty{" "}
                <input
                  type="text"
                  data-testid="qty"
                  value={getQtyInCart(id)}
                  onChange={() => {}}
                />
                <button
                  type="button"
                  data-testid="buttonPlusOne"
                  onClick={() => {
                    handleProducts(productToHanlde, 1);
                  }}
                  disabled={getQtyInCart(id) >= stock}
                >
                  +1
                </button>
                <button
                  data-testid="buttonMinusOne"
                  type="button"
                  onClick={() => {
                    handleProducts(productToHanlde, -1);
                  }}
                  disabled={getQtyInCart(id) === 0}
                >
                  -1
                </button>
              </h2>
            </div>
            <div>
              <h2>Tags: </h2>
              <h3>
                {tags.map((element, i) => (
                  <div key={i}>
                    {"#"}
                    {element}
                  </div>
                ))}
              </h3>
            </div>

            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>Spec</strong>
                  </td>
                  <td>
                    <strong>Spec description</strong>
                  </td>
                </tr>
                {specs.map((element, i) => (
                  <tr key={i}>
                    <td>{element.spec_name}</td>
                    <td>{element.spec_value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
          </div>
        </div>
        <div className="ProductPageDivRow">
          &nbsp;
          <NavLink to="/home/">
            <Button text="Back to Home" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
