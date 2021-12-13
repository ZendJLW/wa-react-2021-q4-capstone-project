import {NavLink} from "react-router-dom";
import React, {useContext} from "react";
import Button from "../Button/Button";
import CartContext from "../../context/CartContext";
import CartItemRow from "../CartItemRow/CartItemRow";

const CartPage = function () {
  // eslint-disable-next-line no-unused-vars
  const {CartProducts, handleProducts} = useContext(CartContext);
  let subtotal = 0;
  if (CartProducts.length === 0) {
    return <h1>Cart Empty</h1>;
  }
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <div style={{display: "flex", flexDirection: "row"}}>
        <table>
          <tr>
            <td>
              {CartProducts.map(element => {
                subtotal += element.price * element.qty;
                return <CartItemRow props={element} />;
              })}
            </td>
          </tr>
        </table>
      </div>
      <div style={{display: "flex", flexDirection: "row"}}>
        <h1>SubTotal: $ {subtotal}</h1>
      </div>
      <div style={{display: "flex", flexDirection: "row"}}>
        <NavLink to="/Checkout/">
          <Button text="Proceed to Checkout" />
        </NavLink>
      </div>
    </div>
  );
};

export default CartPage;
