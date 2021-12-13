import React from "react";

const CheckoutForm = function () {
  return (
    <table>
      <tr>
        <td colSpan="2">
          <h1>Customer Information.</h1>
        </td>
      </tr>
      <tr>
        <td>Name</td>
        <td>
          <input type="text" />
        </td>
      </tr>
      <tr>
        <td>Email</td>
        <td>
          <input type="text" />
        </td>
      </tr>
      <tr>
        <td>ZipCode</td>
        <td>
          <input type="text" />
        </td>
      </tr>
      <tr>
        <td>Notes</td>
        <td>
          <textarea />
        </td>
      </tr>
    </table>
  );
};

export default CheckoutForm;
