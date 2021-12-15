/* eslint-disable spaced-comment */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
//import Categories from "../mocks/en-us/product-categories.json";

function getCategories(Categories) {
  const cats = [];
  for (const i in Categories.results) {
    const cat = Categories.results[i];

    cats.push({
      name: cat.data.name,
      id: cat.id,
      selected: false,
    });
  }
  return cats;
}

export {getCategories};
