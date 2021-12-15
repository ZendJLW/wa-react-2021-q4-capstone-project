/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import "./SideBar.css";

const SideBar = function ({Categories, event}) {
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <div className="CategoriesSideBarTitle">
        <h1>Categories</h1>
      </div>

      {Categories.map(element => (
        <div
          key={element.name}
          className={element.selected ? "SideBarItemSelected" : "SideBarItem"}
          onClick={() => {
            event(element.id);
          }}
        >
          <h1>{element.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
