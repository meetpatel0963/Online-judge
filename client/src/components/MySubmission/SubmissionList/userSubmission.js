import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import "./userSubmission.css";

const UserSubmission = ({ submission }) => {
  return (
    <div
      style={{
        Float: "left",
        overflowY: "scroll",
        height: 500 + "px",
        width: 930 + "px",
      }}
    >
      <SyntaxHighlighter
        showLineNumbers={true}
        language={submission.lang}
        style={a11yDark}
      >
        {submission.code}
      </SyntaxHighlighter>

      <div>
        <Table
          bordered
          className="table"
          style={{ width: 890 + "px", marginTop: 20 + "px" }}
        >
          <tbody>
            {submission.result.map((curTestcase, i) => {
              return [
                <div key={i}>
                  <tr className="submission-row-1">
                    <td colSpan="3" style={{ width: 890 + "px" }}>
                      {" "}
                      Testcase: {i + 1}{" "}
                    </td>
                  </tr>
                  <tr
                    className="submission-row-2"
                    style={{
                      backgroundColor:
                        curTestcase.verdict === "AC" ? "#66BB6A" : "#EF5350",
                    }}
                  >
                    <td>
                      Verdict : {curTestcase.verdict}
                      &nbsp;
                      {curTestcase.verdict === "AC" ? (
                        <FontAwesomeIcon
                          style={{ color: "#1B5E20" }}
                          icon={faCheck}
                        />
                      ) : (
                        <FontAwesomeIcon
                          style={{ color: "#B71C1C" }}
                          icon={faTimes}
                        />
                      )}
                    </td>
                    <td>Time : {curTestcase.time} ms</td>
                    <td>Memory : {curTestcase.memory / 1000} MB</td>
                  </tr>
                  {i < submission.result.length - 1 ? (
                    <tr style={{ border: 0, height: 10 + "px" }}></tr>
                  ) : null}
                </div>,
              ];
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UserSubmission;
