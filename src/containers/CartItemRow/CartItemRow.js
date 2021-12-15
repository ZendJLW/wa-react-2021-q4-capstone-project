import {NavLink} from "react-router-dom";
import "./CartItemRow.css";
import React, {useContext} from "react";
import CartContext from "../../context/CartContext";

const CartItemRow = function ({props}) {
  // eslint-disable-next-line no-unused-vars
  const {CartProducts, handleProducts} = useContext(CartContext);
  const {getQtyInCart} = useContext(CartContext);

  const {img} = props;
  const {category} = props;
  const {title} = props;
  const {price} = props;
  const {id} = props;
  const {showDesc} = props;
  const {desc} = props;
  const {stock} = props;
  const addToCart = qty => {
    handleProducts(
      {
        id,
        title,
        stock,
        category,
        price,
        desc,
        qty: 1,
        img,
      },
      qty,
    );
  };

  return (
    <div
      style={{display: "flex", flexDirection: "row"}}
      width="100%"
      data-testid="cartItem"
    >
      <div>
        <h1 className="title" id="name">
          [{category}]{title}
        </h1>
        <h1> $ {price} </h1>
        <h2>
          {" "}
          [On Stock: {stock}] [On Cart:{getQtyInCart(id)}]
        </h2>
      </div>
      <img className="itemimg" alt="iteming" src={img} />

      <div style={{display: "flex", flexDirection: "column"}}>
        <div>
          Qty <input type="text" value={getQtyInCart(id)} />
          <button
            type="button"
            onClick={() => {
              addToCart(1);
            }}
            disabled={getQtyInCart(id) >= stock}
          >
            +1
          </button>
          <button
            type="button"
            onClick={() => {
              addToCart(-1);
            }}
            disabled={getQtyInCart(id) === 0}
          >
            -1
          </button>
        </div>
        <br />
        &nbsp;
        <NavLink to={`/Product/${id}`}>
          <button type="button">See More</button>
        </NavLink>
      </div>
      <div>{showDesc ? <h3>{desc}</h3> : ""}</div>
      <div style={{display: "flex", flexDirection: "column"}}>
        <div>
          <h1>Subtotal for this item</h1>
        </div>
        <div>
          <h2>$ {getQtyInCart(id) * price}</h2>
        </div>
      </div>
    </div>
  );
};
export default CartItemRow;
