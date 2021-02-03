import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import UserSubmission from "./userSubmission";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SubmissionList = ({ submissions, currentPage, pageSize }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [submission, setSubmission] = useState({});
  const [state, setState] = useState({ submission: {}, open: false });
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

  const handleClick = (i) => {
    const curSubmission = submissions[i];
    setState({
      submission: curSubmission,
      open: true,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h3
        style={{ fontFamily: "Poppins", fontWeight: "bold" }}
        id="simple-modal-title"
      >
        {state.submission["problemName"]} &nbsp;{" "}
      </h3>
      <p
        style={{
          color: state.submission["verdict"] === "AC" ? "#00B74A" : "red",
          fontWeight: "bold",
          fontFamily: "cursive",
        }}
      >
        {verdictMap[state.submission["verdict"]]}
      </p>
      <p style={{ fontFamily: "cursive" }}>
        By &nbsp;
        <Link style={{ textDecoration: "none" }} to="/dashboard">
          {localStorage.getItem("username")}
        </Link>
      </p>
      <hr style={{ borderTop: "2px solid", color: "black" }} />
      <UserSubmission submission={state.submission} />
    </div>
  );

  return (
    <Table bordered hover responsive className="text-center">
      <thead className="bg-dark text-white">
        <tr>
          <th style={{ width: 7 + "%", fontSize: 22 + "px" }}>#</th>
          <th style={{ width: 12 + "%", fontSize: 22 + "px" }}>When</th>
          <th style={{ fontSize: 22 + "px" }}>Problem Name</th>
          <th style={{ width: 7 + "%", fontSize: 22 + "px" }}>Lang</th>
          <th style={{ width: 15 + "%", fontSize: 22 + "px" }}>Verdict</th>
        </tr>
      </thead>
      <tbody style={{ fontSize: 18 + "px" }}>
        {submissions.map((submission, i) => (
          <tr key={submission._id}>
            <td key={i}>{(currentPage - 1) * pageSize + i + 1}</td>
            <td key={i + "date"} style={{ fontSize: 14 + "px" }}>
              {new Date(submission.date).toLocaleString("default", {
                month: "short",
              }) +
                " " +
                new Date(submission.date).getDate() +
                ", " +
                new Date(submission.date).getFullYear()}{" "}
              {new Date(submission.date).toLocaleTimeString()}
            </td>
            <td key={submission["problemName"]}>
              <a
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "#007bff",
                }}
                onClick={() => handleClick(i)}
              >
                {submission["problemName"]}
              </a>
              <Modal
                open={state.open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {body}
              </Modal>
            </td>
            <td key={i + "lang"}>{langMap[submission.lang]}</td>
            <td key={submission["verdict"]} style={{}}>
              <div
                style={{
                  textTransform: "uppercase",
                  marginLeft: "auto",
                  marginRight: "auto",
                  color: "#fff",
                  borderRadius: 15 + "px",
                  width: 80 + "px",
                  backgroundColor:
                    submission.verdict === "AC" ? "#5cb85c" : "#F44336",
                }}
              >
                {submission.verdict}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SubmissionList;
