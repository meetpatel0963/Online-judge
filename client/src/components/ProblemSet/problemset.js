import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination/pagination";
import paginate from "./Pagination/paginate";
import Searchbox from "./Searchbox/searchbox";
import ProblemList from "./ProblemList/problemlist";
import Tags from "./Tags/tags";
import { BeatLoader } from "react-spinners";
import "./problemset.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProblemSet = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allProblems, setAllProblems] = useState([]);
  const [currentFilter, setCurrentFilter] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [didMount, setDidMount] = useState(false);
  const [tags, setTags] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageData = () => {
    let filtered = allProblems;

    if (searchQuery)
      filtered = allProblems.filter((p) =>
        p.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (currentFilter.length !== 0)
      filtered = allProblems.filter((p) =>
        currentFilter.some((tag) => p.tags.includes(tag))
      );

    const currentProblems = paginate(filtered, currentPage, pageSize);
    setProblems(currentProblems);
  };

  const filterProblems = (tag) => {
    let newFilter;
    if (!currentFilter.includes(tag)) {
      newFilter = [tag, ...currentFilter];
    } else {
      newFilter = currentFilter.filter((curTag) => curTag !== tag);
    }

    setCurrentFilter(newFilter);
  };

  useLayoutEffect(() => {
    axios
      .get("http://localhost:5000/home/problem")
      .then((res) => {
        let temp = res.data;
        temp.map((problem, i) => {
          problem["ratio"] = problem.countAC / problem.countTotal;
          problem["index"] = i;
        });

        temp.sort((p1, p2) => {
          return p1.ratio < p2.ratio ? -1 : p1.ratio > p2.ratio ? 1 : 0;
        });

        temp.map((problem, i) => {
          const percentage = ((i + 1) / temp.length) * 100;
          problem["difficulty"] =
            percentage > 70 ? "Hard" : percentage > 40 ? "Medium" : "Easy";
        });

        temp.sort((p1, p2) => {
          return p1.index < p2.index ? -1 : p1.index > p2.index ? 1 : 0;
        });

        let curTags = [];
        temp.map((problem) => {
          problem["tags"].map((curTag) => {
            if (!curTags.includes(curTag)) curTags = [curTag, ...curTags];
          });
        });

        setTags(curTags);
        setAllProblems(temp);
        setDidMount(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, []);

  useEffect(() => {
    if (didMount) {
      getPageData();
      setLoading(false);
    }
  }, [currentPage, didMount]);

  useEffect(() => {
    getPageData();
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    let filtered = allProblems.filter((p) =>
      currentFilter.some((tag) => p.tags.includes(tag))
    );

    if (currentFilter.length === 0) filtered = allProblems;

    const currentProblems = paginate(filtered, currentPage, pageSize);
    setProblems(currentProblems);
    if (searchQuery) setSearchQuery("");
  }, [currentFilter]);

  return (
    <div>
      <div className="container" style={{ marginTop: 10 + "px" }}>
        <ToastContainer />
        <div className="item-1">
          <Searchbox value={searchQuery} onChange={handleSearch} />
        </div>
        <div className="item-2"></div>
        <div className="spinner">
          <BeatLoader color={"#343a40"} size={30} loading={loading} />
        </div>
        <div className="item-3">
          <ProblemList
            problems={problems}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </div>
        <div className="item-4">
          <Tags
            tags={tags}
            currentFilter={currentFilter}
            filterProblems={filterProblems}
          />
        </div>
        <div className="item-5">
          <Pagination
            itemsCount={allProblems.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemSet;
