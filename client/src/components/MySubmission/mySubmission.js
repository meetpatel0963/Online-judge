import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination/pagination";
import paginate from "./Pagination/paginate";
import { BeatLoader } from "react-spinners";
import SubmissionList from "./SubmissionList/submissionlist";
import "./mySubmission.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NothingHere from "../NothingHere/NothingHere";
import { BACK_SERVER_URL } from "../../config/config";

const MySubmission = () => {
  const [submissions, setSubmissions] = useState([]);
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [didMount, setDidMount] = useState(false);
  const [submittedNothing, setSubmittedNothing] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageData = () => {
    let filtered = allSubmissions;
    const currentSubmissions = paginate(filtered, currentPage, pageSize);
    setSubmissions(currentSubmissions);
  };

  useLayoutEffect(() => {
    const parseJwt = (token) => {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    };

    const userId = parseJwt(localStorage.getItem("x-auth-token"))._id;

    axios
      .get(`${BACK_SERVER_URL}/home/submission/usersubmission/${userId}`)
      .then((res) => {
        if (!res.data || res.data.length === 0) setSubmittedNothing(true);
        setAllSubmissions(res.data);

        setDidMount(true);
      })
      .catch((err) => {
        const error = err.response ? err.response.data.message : err.message;
        toast.error(error, {
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

  return submittedNothing ? (
    <>
      <div className="spinner">
        <BeatLoader color={"#343a40"} size={30} loading={loading} />
      </div>
      <NothingHere />
    </>
  ) : (
    <div>
      <div className="container" style={{ paddingTop: 70 + "px" }}>
        <ToastContainer />
        <div className="item-2"></div>
        <div className="spinner">
          <BeatLoader color={"#343a40"} size={30} loading={loading} />
        </div>
        <div className="item-3">
          <SubmissionList
            submissions={submissions}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </div>
        <div className="item-5">
          <Pagination
            itemsCount={allSubmissions.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MySubmission;
