import "./Header.css";
import {useState, useContext, React} from "react";
import {NavLink} from "react-router-dom";
import shoppingCart from "../../imgs/shoppingCart.png";
import CartContext from "../../context/CartContext";
import logo from "../../imgs/mugiwara.jpg";

const Header = function ({imgAlt, title}) {
  const {CartProducts} = useContext(CartContext);

  const img = logo;
  const [searchValue, searchValueState] = useState("");

  const changeSearchValue = event => {
    searchValueState(event.target.value);
  };

  const getTotalCartItems = () => {
    let cont = 0;
    CartProducts.forEach(element => {
      cont += element.qty;
    });
    return cont;
  };

  return (
    <div
      style={{display: "flex", flexDirection: "row"}}
      className="headerTable"
    >
      <div className="headerLogo">
        <NavLink to="/home">
          <img src={img} alt={imgAlt} className="headerLogoImg" />
        </NavLink>
      </div>
      <div className="headerTitle">
        <h1> {title} </h1>
      </div>
      <div className="cart">
        <NavLink to="/cart">
          <img src={shoppingCart} alt="cartImg" className="cartImg" />
        </NavLink>
        <p> {getTotalCartItems()} Items on Cart</p>
      </div>
      <div className="search">
        Search <input id="SearchInput" onChange={changeSearchValue} />
        &nbsp;
        <button type="button">
          <a href={`/search?q=${searchValue}`}>Search</a>
        </button>
      </div>
    </div>
  );
};

export default Header;
