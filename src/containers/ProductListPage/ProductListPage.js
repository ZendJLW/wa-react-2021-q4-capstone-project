import Item from "../Item/Item";
import "./ProductListPage.css";
import SideBar from "../SideBar/SideBar";
import PaginationBar from "../PaginationBar/PaginationBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductListPage({
  Categories,
  Products,
  itemsPerPage = 16,
  cartProducts,
}) {
  let items = [];
  let maxItems = 0;
  let params = useParams();
  const { isLoading } = Products;
  const [ItemsStates, updateItemsStates] = useState(items);
  const [CategoriesStates, updateCategoriesStates] = useState(Categories);
  const changeCategoryState = (id) => {
    let arr = [];
    let arrCatSelecteds = [];
    for (let i in CategoriesStates) {
      let cat = CategoriesStates[i];
      if (cat.id === id) {
        cat.selected = !cat.selected;
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

    //filtrar
    if (arrCatSelecteds.length !== 0) {
      let arrItem = [];
      for (let i in items) {
        let it = items[i];
        if (arrCatSelecteds.includes(it.data.category.id)) {
          arrItem.push(it);
        }
      }
      updateItemsStates(arrItem);
    } else {
      updateItemsStates(items);
    }
  };
  const getSelectedCategories = () => {
    let arrCatSelecteds = [];
    for (let i in CategoriesStates) {
      let cat = CategoriesStates[i];
      if (cat.selected) {
        arrCatSelecteds.push(cat.id);
      }
    }
    return arrCatSelecteds;
  };

  const updateItems = () => {
    let arrCatSelecteds = getSelectedCategories();
    //filtrar
    if (arrCatSelecteds.length !== 0) {
      let arrItem = [];
      for (let i in items) {
        let it = items[i];
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
    let arr = [];
    for (let i in CategoriesStates) {
      let cat = CategoriesStates[i];

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
      for (let i in CategoriesStates) {
        let cat = CategoriesStates[i];
        if (cat.id === params.id) {
          changeCategoryState(params.id);
          params.id = null;
          break;
        }
      }
    }
    if (params.id === undefined) {
      if (ItemsStates.length === 0) updateItemsStates(items);
    }
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  items = Products.data.results;

  let pages = Math.ceil(items.length / itemsPerPage);
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      width="100%"
    >
      <div style={{ display: "flex", flexDirection: "row" }} >
        <div >
          {ItemsStates.map((element, i) => {
            if (i < itemsPerPage) maxItems = i;
            if (i > itemsPerPage) return null;
            return (
              <div class="float-child">
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
          })}
        </div>
        <div class="CategoriesSideBar" rowSpan={maxItems}>
          <SideBar
            Categories={CategoriesStates}
            event={changeCategoryState}
          ></SideBar>
          <br />
          <button class="genericButton" onClick={borrarFiltros}>
            Clear filters
          </button>
        </div>
      </div>
      <PaginationBar pages={pages}></PaginationBar>
    </div>
  );
}

export default ProductListPage;
