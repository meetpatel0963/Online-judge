import React, { useState, useLayoutEffect, useEffect } from "react";
import "./sidebar.css";
import { FormControlLabel } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { tagsData } from "../../utils";

export default function Sidebar({
  problems,
  setRows,
  searchQuery,
  setSearchQuery,
  tagsSelected,
  setTagsSelected,
}) {
  const [tags, setTags] = useState([]);

  useLayoutEffect(() => {
    let tagsObj = [];
    tagsData.forEach((tag) => {
      tagsObj.push({ name: tag, checked: false });
    });
    setTags(tagsObj);
  }, []);

  useEffect(() => {
    const filterProblems = () => {
      let filtered = problems;
      let currentFilter = [];
      tags.forEach((tag) => {
        if (tag.checked === true) currentFilter.push(tag.name);
      });

      if (currentFilter.length !== 0) {
        filtered = problems.filter((p) =>
          currentFilter.some((tag) => p.tags.includes(tag))
        );
        setTagsSelected(true);
        setSearchQuery("");
        setRows(filtered);
      } else if (searchQuery === "") {
        setRows(filtered);
      }
    };

    filterProblems();

    // eslint-disable-next-line
  }, [tags]);

  useEffect(() => {
    if (!tagsSelected && tags.length !== 0) {
      let newTags = [...tags];
      console.log(newTags);
      newTags.forEach((tag) => {
        tag.checked = false;
      });
      setTags(newTags);
    }

    // eslint-disable-next-line
  }, [tagsSelected]);

  const handleSelect = (e) => {
    let newTags = [...tags];
    newTags.forEach((tag) => {
      if (tag.name === e.target.value) tag.checked = !tag.checked;
    });
    setTags(newTags);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-menu">
          <h3 className="sidebar-title">Tags</h3>
          <div className="sidebar-list">
            {tags.map((tag, index) => (
              <div className="sidebar-list-item" key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={tag.name}
                      value={tag.name}
                      checked={tag.checked}
                      onChange={handleSelect}
                    />
                  }
                  label={tag.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
