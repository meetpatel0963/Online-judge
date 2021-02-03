import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Spinner, Table } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";

const ResultTable = ({
  resultRef,
  loading,
  submitted,
  result,
  color,
  input,
  op,
}) => {
  return (
    <div>
      <div ref={resultRef}>
        {loading ? (
          <center>
            <Table
              bordered
              className="text-center"
              style={{ width: 650 + "px" }}
            >
              <tbody>
                <tr
                  style={{
                    lineHeight: "15px",
                    backgroundColor: "#263238",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="submitting">Submitting... &nbsp;</p>
                  <CircularProgress size={"25px"} style={{ color: "white" }} />
                </tr>
              </tbody>
            </Table>
          </center>
        ) : null}
        {submitted ? (
          <Table bordered className="table" style={{ width: 650 + "px" }}>
            <tbody>
              {input || (op !== "customInput" && input === "") ? (
                !(op === "customInput" && input) ? (
                  result.map((curResult, i) => {
                    return [
                      <div key={i}>
                        <tr className="result-row-1">
                          <td colSpan="3" style={{ width: 650 + "px" }}>
                            {" "}
                            Testcase: {i + 1}{" "}
                          </td>
                        </tr>
                        <tr
                          className="result-row-2"
                          style={{ backgroundColor: color[i] }}
                        >
                          <td>
                            Verdict : &nbsp;
                            {Object.keys(curResult).map(function (key) {
                              if (curResult[key] === true) return key;
                            })}{" "}
                            &nbsp;
                            {color[i] === "#66BB6A" ? (
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
                          <td>Time : {curResult.time} ms</td>
                          <td>Memory : {curResult.memory / 1000} MB</td>
                        </tr>
                        <tr className="result-row-3">
                          <td
                            colSpan="3"
                            style={{
                              width: 650 + "px",
                            }}
                          >
                            <p
                              className="scrollable"
                              style={{ overflowY: "scroll", height: "100px" }}
                            >
                              {" "}
                              Your Output : <pre>{curResult.actualOutput}</pre>
                            </p>
                          </td>
                        </tr>
                        {i < result.length - 1 ? (
                          <tr style={{ border: 0, height: 10 + "px" }}></tr>
                        ) : null}
                      </div>,
                    ];
                  })
                ) : (
                  <div>
                    <tr className="result-row-3">
                      <td colSpan="3" style={{ width: 650 + "px" }}>
                        <p className="scrollable">
                          {" "}
                          Your Output : <pre>{result[0].actualOutput}</pre>
                        </p>
                      </td>
                    </tr>
                    <tr style={{ border: 0, height: 10 + "px" }}></tr>
                  </div>
                )
              ) : null}
            </tbody>
          </Table>
        ) : null}
      </div>
    </div>
  );
};

export default ResultTable;
