/* eslint-disable no-use-before-define */
import React, {useState} from "react";
import CategoriesItem from "../Categories/CategoriesItem";
import "./CategoriesSlider.css";

const CategoriesSlider = function ({categories}) {
  const [current, setCurrent] = useState(0);
  // const {isLoading} = categories;

  // if (isLoading) {
  // return <h1>Loading...</h1>;
  // }
  // eslint-disable-next-line no-param-reassign
  // categories = categories.data;

  const {length} = categories;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(categories) || categories.length <= 0) {
    return null;
  }
  setTimeout(() => {
    nextSlide();
  }, 5000);

  return (
    <section className="slider">
      <table className="categoryslidertable">
        <tbody>
          <tr>
            <th className="title" colSpan="5">
              Categories
            </th>
          </tr>
          <tr>
            <td className="button">
              <button type="button" className="left-arrow" onClick={prevSlide}>
                prev category
              </button>
            </td>
            <td className="category">
              <CategoriesItem index={current} categories={categories} />
            </td>
            <td className="category">
              <CategoriesItem
                index={getNext(current, length, 1)}
                categories={categories}
              />
            </td>
            <td className="category">
              <CategoriesItem
                index={getNext(current, length, 2)}
                categories={categories}
              />
            </td>
            <td className="button">
              <button type="button" className="right-arrow" onClick={nextSlide}>
                next category
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

function getNext(current, length, index) {
  return current + index > length - 1 ? 0 : current + index;
}

export default CategoriesSlider;
