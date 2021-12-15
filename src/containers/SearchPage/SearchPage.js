import React from "react";
import PaginationBar from "../PaginationBar/PaginationBar";
import Item from "../Item/Item";
import "./SearchPage.css";

const SearchPage = function ({Products, itemsPerPage = 20, q}) {
  // const {isLoading} = Products;

  // if (isLoading) {
  // return <h1>Loading...</h1>;
  // }
  const getParamValueFromKey = searchKey => {
    const params = new URLSearchParams(window.location.search);
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of params) {
      if (key === searchKey) return value;
    }
    return null;
  };

  let searchTerm = getParamValueFromKey("q") || q;

  searchTerm = searchTerm.toUpperCase();
  const items = Products.results;
  let itemCount = 0;
  return (
    <div
      style={{display: "flex", flexDirection: "column"}}
      className="float-container"
      width="100%"
    >
      <div style={{display: "flex", flexDirection: "row"}}>
        <div>
          {items.map((element, i) => {
            const name = element.data.name.toUpperCase();
            if (name.includes(searchTerm)) {
              // eslint-disable-next-line no-plusplus
              itemCount++;
              if (i >= itemsPerPage) return null;
              return (
                <div className="float-child" data-testid="item">
                  <Item
                    title={element.data.name}
                    img={element.data.mainimage.url}
                    desc={element.data.short_description}
                    price={element.data.price}
                    category={element.data.category.slug}
                    id={element.id}
                    showDesc
                  />
                </div>
              );
            }
            return <div />;
          })}
        </div>
        {itemCount === 0 ? <h1>Not Matches Found</h1> : ""}
      </div>
      {itemCount === 0 ? (
        ""
      ) : (
        <PaginationBar pages={Math.ceil(itemCount / itemsPerPage)} />
      )}
    </div>
  );
};

export default SearchPage;
