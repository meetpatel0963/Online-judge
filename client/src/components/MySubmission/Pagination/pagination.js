import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import "./pagination.css";

const Pagination = ({ itemsCount, currentPage, pageSize, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages =
    currentPage <= 3
      ? _.range(1, Math.min(6, pagesCount + 1))
      : _.range(currentPage - 2, currentPage + 3);

  return (
    <div>
      <nav>
        <ul className="pagination">
          <li>
            <button className="page-link" onClick={() => onPageChange(1)}>
              {"«"}
            </button>
          </li>
          <li>
            <button
              className="page-link"
              onClick={() =>
                onPageChange(currentPage === 1 ? 1 : currentPage - 1)
              }
            >
              {"‹"}
            </button>
          </li>
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              className="page-link"
              onClick={() =>
                onPageChange(
                  currentPage === pagesCount ? pagesCount : currentPage + 1
                )
              }
            >
              {"›"}
            </button>
          </li>
          <li>
            <button
              className="page-link"
              onClick={() => onPageChange(pagesCount)}
            >
              {"»"}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
