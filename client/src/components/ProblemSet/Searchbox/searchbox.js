import React, { useState } from "react";

const Searchbox = ({ value, onChange }) => {
  return (
    <div className="active-cyan-3 active-cyan-4 mb-4">
      <input
        className="form-control"
        type="text"
        placeholder="Search"
        aria-label="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Searchbox;
