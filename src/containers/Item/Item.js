import {NavLink} from "react-router-dom";
import "./Item.css";
import {useContext, React} from "react";
import CartContext from "../../context/CartContext";
import Button from "../Button/Button";

const Item = function ({
  img,
  category,
  title,
  price,
  id,
  showDesc,
  desc,
  stock,
}) {
  // eslint-disable-next-line no-unused-vars
  const {CartProducts, handleProducts} = useContext(CartContext);
  const {getQtyInCart} = useContext(CartContext);
  const addToCart = () => {
    // alert("lmao");
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
      1,
    );
  };

  return (
    <div className="card">
      <div className="title">
        <h1 className="title">
          [{category}]{title}
        </h1>
        <h1> $ {price} </h1>{" "}
        <h2>
          {" "}
          [On Stock: {stock}] [On Cart:{getQtyInCart(id)}]
        </h2>
      </div>
      <img className="itemimg" alt="iteming" src={img} />

      <div style={{display: "flex", flexDirection: "row"}}>
        <button
          type="button"
          onClick={addToCart}
          disabled={getQtyInCart(id) >= stock}
        >
          Add To Cart
        </button>
        <br />
        &nbsp;
        <NavLink to={`/Product/${id}`}>
          <Button text="See More" />
        </NavLink>
      </div>
      <div>{showDesc ? <h3>{desc}</h3> : ""}</div>
    </div>
  );
};
export default Item;
