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
    <div className="pagination" data-testid="paginationBar">
      <a
        data-testid="prev"
        href={`/ProductList/?page=${page - 1}`}
        className={page - 1 === 0 ? "isDisabled" : "AAAA"}
      >
        {" "}
        &laquo;
      </a>
      {arrayPages.map((element, i) => (
        <a
          data-testid="pages"
          // eslint-disable-next-line react/no-array-index-key
          key={`${i}`}
          href={`/ProductList/?page=${i + 1}`}
          className={i + 1 === page ? "active" : ""}
        >
          {i + 1}
        </a>
      ))}
      <a
        data-testid="next"
        href={`/ProductList/?page=${page + 1}`}
        className={pages > page ? "" : "isDisabled"}
      >
        &raquo;
      </a>
    </div>
  );
};

export default PaginationBar;
