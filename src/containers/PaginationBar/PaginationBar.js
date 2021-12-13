/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./PaginationBar.css";

const PaginationBar = function ({pages, page}) {
  const arrayPages = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < pages; i++) {
    arrayPages.push(1);
  }
  return (
    <div className="pagination">
      <a href={page - 1 > 0 ? `/ProductList/?page=${page - 1}` : "#"}>
        {" "}
        &laquo;
      </a>
      {arrayPages.map((element, i) => (
        <a
          href={`/ProductList/?page=${i + 1}`}
          className={i + 1 === page ? "active" : ""}
        >
          {i + 1}
        </a>
      ))}
      <a href={page < pages ? `/ProductList/?page=${page + 1}` : "#"}>
        &raquo;
      </a>
    </div>
  );
};

export default PaginationBar;
