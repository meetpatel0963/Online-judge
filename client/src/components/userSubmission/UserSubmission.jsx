import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { BACK_SERVER_URL } from "../../config/config";

import "./userSubmission.css";
import "react-toastify/dist/ReactToastify.css";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";
import Modal from "@material-ui/core/Modal";
import { Link } from "react-router-dom";

import NoContent from "./noContent/NoContent";
import Submission from "./submission/Submission";
import { getDateTime } from "../../utils";

const columns = [
  { id: "id", align: "center", label: "#", minWidth: 10 },
  { id: "date", align: "center", label: "When", minWidth: 50 },
  { id: "problemName", align: "center", label: "Problem Name", minWidth: 100 },
  { id: "lang", align: "center", label: "Language", minWidth: 50 },
  { id: "verdict", align: "center", label: "Verdict", minWidth: 50 },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    width: "100%",
    height: "calc(100vh - 100px)",
  },
  container: {
    maxHeight: 550,
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function UserSubmission() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(true);
  const [modalStyle] = useState(getModalStyle);
  const [modalState, setModalState] = useState({ submission: {}, open: false });
  const [hasSubmissions, setHasSubmissions] = useState(true);

  const verdictMap = {
    AC: "Accepted",
    WA: "Wrong Answer",
    CE: "Compilation Error",
    RTE: "Runtime Error",
    TLE: "Time Limit Exceeded",
    MLE: "Memory Limit Exceeded",
  };
  const langMap = {
    c: "C",
    cpp: "C++",
    java: "Java8",
    python: "Python3",
  };

  useLayoutEffect(() => {
    const parseJwt = (token) => {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    };
    
    const accessToken = localStorage.getItem("access-token");
    const userId = parseJwt(accessToken).sub;

    axios
      .get(`${BACK_SERVER_URL}/api/submission/user/${userId}`, { headers: {"Authorization" : `Bearer ${accessToken}`} })
      .then((res) => {
        if (!res.data || res.data.length === 0) setHasSubmissions(false);
        else setRows(res.data);
        setLoader(false);
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

  const handleClick = (i) => {
    const curSubmission = rows[i];
    setModalState({
      submission: curSubmission,
      open: true,
    });
  };

  const handleClose = () => {
    setModalState({
      ...modalState,
      open: false,
    });
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h3 className="usersubmission-modal-title" id="simple-modal-title">
        {modalState.submission.problemName}
      </h3>
      <p className="usersubmission-modal-details">
        <Chip
          label={verdictMap[modalState.submission.verdict]}
          style={{
            fontWeight: "bold",
            color: "white",
            maxWidth: "200px",
            backgroundColor:
              modalState.submission.verdict === "AC" ? "#5cb85c" : "#F44336",
          }}
        />
      </p>
      <p className="usersubmission-modal-details">
        By
        <Link className="usersubmission-modal-username" to="/dashboard">
          {localStorage.getItem("username")}
        </Link>
      </p>
      <hr className="usersubmission-modal-hr" />
      <Submission submission={modalState.submission} />
    </div>
  );

  return hasSubmissions === false ? (
    <>
      <NoContent />
    </>
  ) : (
    <div className="usersubmission-container">
      <ToastContainer />
      <div className="usersubmission-spinner">
        <BeatLoader color={"#343a40"} size={30} loading={loader} />
      </div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value =
                          column.id === "id" ? index + 1 : row[column.id];
                        if (column.id === "date") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <span
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "15px",
                                  textDecoration: "none",
                                  color: "#1a237e",
                                }}
                              >
                                {getDateTime(value)}
                              </span>
                            </TableCell>
                          );
                        } else if (column.id === "problemName") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Link
                                onClick={() => handleClick(index)}
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "15px",
                                  textDecoration: "none",
                                  color: "#1a237e",
                                }}
                              >
                                {value}
                              </Link>
                              <Modal
                                open={modalState.open}
                                onClose={handleClose}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                              >
                                {body}
                              </Modal>
                            </TableCell>
                          );
                        } else if (column.id === "verdict") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Chip
                                label={verdictMap[value]}
                                style={{
                                  fontWeight: "bold",
                                  color: "white",
                                  maxWidth: "200px",
                                  backgroundColor:
                                    value === "AC" ? "#5cb85c" : "#F44336",
                                }}
                              />
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <span
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "15px",
                                  color: "#1a237e",
                                }}
                              >
                                {column.id === "lang" ? langMap[value] : value}
                              </span>
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
