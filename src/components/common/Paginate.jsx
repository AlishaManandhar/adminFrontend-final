import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { pageSize, currentPage, itemsCount, onPageChange } = props;
  const rangeValue = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, rangeValue + 1);
  if (pages.length === 1) return null;
  
  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pages.map((page) => (
          <li className={currentPage === page ? "page-item active" : "page-item"} key={page}>
            <a  className="page-link" onClick={() => onPageChange(page) }>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;