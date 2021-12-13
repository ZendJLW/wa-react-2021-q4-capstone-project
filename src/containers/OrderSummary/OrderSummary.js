import {useContext, React} from "react";
import CartContext from "../../context/CartContext";

const OrderSummary = function () {
  const {CartProducts} = useContext(CartContext);
  let total = 0;
  let subtotal = 0;
  return (
    <table width="100%">
      <tr>
        <td colSpan="3">
          <h1>Order Summary</h1>
        </td>
      </tr>
      <tr>
        <th>
          <h1>Product</h1>
        </th>
        <th>
          <h1>Quantity</h1>
        </th>
        <th>
          <h1>Subtotal</h1>
        </th>
      </tr>
      {CartProducts.map(element => {
        subtotal = element.price * element.qty;
        total += subtotal;
        return (
          <tr>
            <td>
              <h2>{element.title}</h2>
            </td>
            <td>
              <h2>{element.qty}</h2>
            </td>
            <td>
              <h2>$ {subtotal}</h2>
            </td>
          </tr>
        );
      })}
      <tr>
        <td colSpan="3">
          <h2>Cart Total: $ {total}</h2>
        </td>
      </tr>
    </table>
  );
};

export default OrderSummary;
