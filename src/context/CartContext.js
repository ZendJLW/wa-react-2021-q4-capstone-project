import {useState, createContext, React} from "react";

const CartContext = createContext();

const CartProvider = function ({children}) {
  const [CartProducts, setProducts] = useState([]);

  const handleProducts = (product, qty) => {
    let existe = -1;
    const products = [];
    CartProducts.forEach((element, i) => {
      if (element.id === product.id) {
        existe = i;
      }
      products.push(element);
    });
    if (existe === -1) {
      products.push(product);
    } else {
      products[existe].qty += qty;
      if (products[existe].qty === 0) {
        products.splice(existe, 1);
      }
    }
    setProducts(products);
  };

  const getQtyInCart = id => {
    let cont = 0;
    CartProducts.forEach(element => {
      if (id === element.id) {
        cont = element.qty;
      }
    });
    return cont;
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const data = {CartProducts, handleProducts, getQtyInCart};
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export {CartProvider};
export default CartContext;
