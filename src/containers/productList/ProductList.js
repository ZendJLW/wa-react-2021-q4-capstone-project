import React from "react";
import Item from "../Item/Item";
import "./ProductList.css";

const List = function ({Products}) {
  // const {isLoading} = Products;

  // if (isLoading) {
  // return <h1>Loading...</h1>;
  // }
  const items = Products.results;

  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      {items.map((element, i) => {
        if (i < 3)
          return (
            <div key={element.id} className="float-child">
              <Item
                title={element.data.name}
                img={element.data.mainimage.url}
                desc={element.data.short_description}
                price={element.data.price}
                category={element.data.category.slug}
                id={element.id}
                stock={element.data.stock}
                alt={element.data.mainimage.alt}
              />
            </div>
          );

        return "";
      })}
    </div>
  );
};

export default List;
