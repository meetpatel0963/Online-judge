import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

const ProblemDescription = ({ problem }) => {
  return (
    <div>
      <div className="problem">
        <div className="problename">
          <div className="item1">
            <FontAwesomeIcon
              title="Happy Coding!"
              style={{ color: "#00ACC1" }}
              icon={faCode}
            />
            &nbsp;
            {problem.name}
          </div>
          <h6 className="item2">Time : {problem.time} ms</h6>
          <h6 className="item3">Memory : {problem.memory} MB</h6>
        </div>
        <hr className="hr" />
        <div
          className="statement"
          dangerouslySetInnerHTML={{ __html: problem.statement }}
        ></div>
      </div>
      <div>
        <div
          className="example"
          style={{ fontWeight: "bold", fontSize: 18 + "px" }}
        >
          {" "}
          Examples :{" "}
        </div>
        {problem.sampleTestcase &&
          problem.sampleTestcase.map((testcase, i) => (
            <div className="example" key={i}>
              <div className="input"> Sample Input {i + 1} </div>
              <div className="input-content">
                <pre>{testcase.input}</pre>
              </div>
              <div className="output"> Sample Output {i + 1} </div>
              <div className="output-content ">
                <pre>{testcase.output}</pre>
              </div>
            </div>
          ))}
        {problem.explanation ? (
          <div className="example">
            {" "}
            <h5 style={{ fontWeight: "bold", fontSize: 16 + "px" }}>
              {" "}
              Explanation : &nbsp;
            </h5>{" "}
            <pre>{problem.explanation}</pre>
          </div>
        ) : null}
        <div style={{ marginBottom: 80 + "px" }}></div>
      </div>
    </div>
  );
};

export default ProblemDescription;
