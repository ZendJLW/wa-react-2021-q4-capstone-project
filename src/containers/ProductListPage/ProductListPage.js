import { div } from "prelude-ls";
import Item from "../productItem/Item";
import "./ProductListPage.css";
//import Products from "./../../mocks/en-us/products.json";
import SideBar from "../SideBar/SideBar";
import PaginationBar from "../PaginationBar/PaginationBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button, { EventButton } from "../Button/Button";



function ProductListPage({ Categories,Products,itemsPerPage=16 }) {
  let items = [];
  let maxItems = 0;
  let arrCatSelecteds = [];
  let params = useParams();
  const {isLoading} = Products;
  const [ItemsStates, updateItemsStates] = useState(items);
  const [CategoriesStates, updateCategoriesStates] = useState(Categories);

  const changeCategoryState = (id) => {
    let arr = [];
    arrCatSelecteds = [];
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

  const borrarFiltros=()=>{
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

  useEffect(()=>{

  if (params.id !== null) {
    for (let i in CategoriesStates) {
      let cat = CategoriesStates[i];
      if (cat.id === params.id && !cat.selected) {
        changeCategoryState(params.id);
        params.id = null;
      }
    }
  }
});

  if(isLoading){
    return(<h1>Loading...</h1>);
  }
  items = Products.data.results;


  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      class="float-container"
      width="100%"
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          {ItemsStates.map((element, i) => {
            if(i<itemsPerPage)maxItems = i;
            if(i>itemsPerPage)return null;
            return (
              <div class="float-child">
                <Item
                  title={element.data.name}
                  img={element.data.mainimage.url}
                  desc={element.data.short_description}
                  price={element.data.price}
                  category={element.data.category.slug}
                  id={element.id}
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
          <br/>
          <button class="genericButton" onClick={borrarFiltros}>Clear filters</button>
        </div>
      </div>

      <PaginationBar></PaginationBar>
    </div>
  );
  
}

export default ProductListPage;
