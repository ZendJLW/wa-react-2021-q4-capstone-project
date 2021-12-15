/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import {useEffect, useState, React} from "react";
import {useParams} from "react-router-dom";
import "./ProductListPage.css";
import SideBar from "../SideBar/SideBar";
// eslint-disable-next-line import/no-cycle
import PaginationBar from "../PaginationBar/PaginationBar";
import Item from "../Item/Item";

const ProductListPage = function ({
  Categories,
  Products,
  itemsPerPage = 16,
  cartProducts,
}) {
  const getParamValueFromKey = searchKey => {
    const params = new URLSearchParams(window.location.search);
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of params) {
      if (key === searchKey) return value;
    }
    return null;
  };

  const pageString = getParamValueFromKey("page") || "1";

  const page = parseInt(pageString, 10);
  let items = [];
  const params = useParams();
  const [ItemsStates, updateItemsStates] = useState(items);
  const [CategoriesStates, updateCategoriesStates] = useState(Categories);
  const changeCategoryState = (id, value, allOthers) => {
    const arr = [];
    const arrCatSelecteds = [];
    for (const i in CategoriesStates) {
      const cat = CategoriesStates[i];
      if (cat.id === id) {
        if (value !== null) cat.selected = !cat.selected;
        else cat.selected = value;
      } else if (allOthers !== null && allOthers !== undefined) {
        cat.selected = allOthers;
        console.log(allOthers);
      }

      if (cat.selected) {
        arrCatSelecteds.push(cat.id);
      }
      arr.push({
        name: cat.name,
        id: cat.id,
        selected: cat.selected,
      });
    }
    updateCategoriesStates(arr);

    // filtrar
    if (arrCatSelecteds.length !== 0) {
      const arrItem = [];
      for (const i in items) {
        const it = items[i];
        if (arrCatSelecteds.includes(it.data.category.id)) {
          arrItem.push(it);
        }
      }
      updateItemsStates(arrItem);
    } else {
      updateItemsStates(items);
    }
  };

  const borrarFiltros = () => {
    const arr = [];
    for (const i in CategoriesStates) {
      const cat = CategoriesStates[i];

      arr.push({
        name: cat.name,
        id: cat.id,
        selected: false,
      });
    }
    updateCategoriesStates(arr);
    updateItemsStates(items);
  };

  useEffect(() => {
    if (params.id !== undefined) {
      for (const i in CategoriesStates) {
        const cat = CategoriesStates[i];
        if (cat.id === params.id) {
          changeCategoryState(params.id, true, false);
          params.id = null;
          break;
        }
      }
    }
    if (params.id === undefined) {
      if (ItemsStates.length === 0) updateItemsStates(items);
    }
  });

  items = Products.results;
  let productCount = 0;
  const pages = Math.ceil(items.length / itemsPerPage);
  return (
    <div style={{display: "flex", flexDirection: "column"}} width="100%">
      <div style={{display: "flex", flexDirection: "row"}}>
        <div>
          {ItemsStates.map((element, i) => {
            if (
              i >= (page - 1) * itemsPerPage &&
              // eslint-disable-next-line prettier/prettier
              i < ((page - 1) * itemsPerPage) + itemsPerPage
            ) {
              // eslint-disable-next-line no-plusplus
              productCount++;
              return (
                <div className="float-child">
                  <Item
                    title={element.data.name}
                    img={element.data.mainimage.url}
                    desc={element.data.short_description}
                    price={element.data.price}
                    category={element.data.category.slug}
                    id={element.id}
                    cartProducts={cartProducts}
                    stock={element.data.stock}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="CategoriesSideBar" rowSpan={productCount}>
          <SideBar Categories={CategoriesStates} event={changeCategoryState} />
          <br />
          <button
            type="button"
            className="genericButton"
            onClick={borrarFiltros}
          >
            Clear filters
          </button>
        </div>
      </div>
      <PaginationBar pages={pages} page={page} />
    </div>
  );
};

export default ProductListPage;
