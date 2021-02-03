import React from "react";

const Tags = ({ tags, currentFilter, filterProblems }) => {
  return (
    <div>
      {tags.map((tag) => (
        <a
          key={tag}
          className="problemset-tags-btn"
          style={{
            backgroundColor: currentFilter.includes(tag) ? "#17a2b8" : "#fff",
          }}
          onClick={() => {
            filterProblems(tag);
          }}
        >
          <span
            className="text-sm text-gray"
            style={{ color: currentFilter.includes(tag) ? "#fff" : "#000" }}
          >
            {tag}
          </span>
        </a>
      ))}
    </div>
  );
};

export default Tags;
