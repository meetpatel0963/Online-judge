import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import Chip from "@material-ui/core/Chip";

import { BACK_SERVER_URL } from "../../config/config";

import CodeEditor from "./codeEditor/CodeEditor";
import ResultTable from "./resultTable/ResultTable";
import { getDifficulty } from "../../utils";

import "./problem.css";

const Problem = (props) => {
  const resultRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [problemDoesNotExists, setProblemDoesNotExists] = useState(false);
  const [problem, setProblem] = useState({});
  const [language, setLanguage] = useState("C++");
  const [darkMode, setDarkMode] = useState(false);
  const [code, setCode] = useState("");
  const [results, setResults] = useState([]);
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const languageExtention = {
    C: "c",
    "C++": "cpp",
    Java: "java",
    Python: "py",
  };
  
  useEffect(() => {
    const problemName = props.match.params.name;

    axios
      .get(`${BACK_SERVER_URL}/home/problem/${problemName}`)
      .then((res) => {
        if (!res.data || res.data.length === 0) setProblemDoesNotExists(true);
        else {
          setProblem(res.data);
        }
        setLoading(false);
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

    return () => {};
  }, [props.match.params.name]);

  const handleLanguageSelect = (e) => {
    e.preventDefault();
    setLanguage(e.target.value);
  };

  const handleModeChange = (themeMode) => {
    setDarkMode(themeMode);
  };

  const onCodeChange = (newValue) => {
    setCode(newValue);
  };
  
  const parseJwt = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };
  
  const submit = (e) => {
    e.preventDefault();
    const operation = e.currentTarget.value.toString();
    if (operation === "runcode") setRunLoading(true);
    else setSubmitLoading(true);
    
    const token = localStorage.getItem("x-auth-token");
    const userId = parseJwt(token)._id;
    const difficulty = getDifficulty(problem).toLowerCase();
    axios
      .post(`${BACK_SERVER_URL}/home/submission`, {
        problemName: problem.name,
        code,
        lang: languageExtention[language],
        operation,
        userId,
      })
      .then((res) => {
        if (operation === "runcode") setRunLoading(false);
        else {
          setSubmitLoading(false);
            axios
              .put(
                `${BACK_SERVER_URL}/home/submission`,
                {
                  problemName: problem.name,
                  finalResult: res.data.finalResult,
                  userId,
                  difficulty,
                },
                {
                  headers: {
                    "x-auth-token": token,
                  },
                }
              )
              .then((result) => {})
              .catch((err) => {
                const error = err.response
                  ? err.response.data.message
                  : err.message;
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
        }
        setResults(res.data.finalResult);
        
        if (resultRef.current) {
          resultRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        }
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
  };

  return problemDoesNotExists ? (
    <>
      <h1>Not Found</h1>
    </>
  ) : (
    <div>
      <div className="problem-container">
        <ToastContainer />
        <div className="problem-loading-spinner">
          <BeatLoader color={"#343a40"} size={30} loading={loading} />
        </div>
        <div className="problem-title-wrapper">
          <div className="problem-title">
            <FontAwesomeIcon
              title="Happy Coding!"
              className="problem-code-icon"
              icon={faCode}
            />
            {problem.name}
          </div>
          <div className="problem-details">
            <div className="problem-details-item">
              <Chip
                label={"Time: " + problem.time + "s"}
                variant="outlined"
                color="primary"
                style={{ fontWeight: "600", fontSize: "medium" }}
              />
            </div>
            <div className="problem-details-item">
              <Chip
                label={"Memory: " + problem.memory + "MB"}
                variant="outlined"
                color="primary"
                style={{ fontWeight: "600", fontSize: "medium" }}
              />
            </div>
          </div>
        </div>
        <div className="problem-statement-wrapper">
          <div
            className="problem-statement"
            dangerouslySetInnerHTML={{
              __html: problem.statement
                ? problem.statement.replace(/<br>/g, " ")
                : null,
            }}
          />
        </div>
        <div className="problem-sample-test-wrapper">
          {problem.sampleTestcase &&
            problem.sampleTestcase.map((testcase, index) => (
              <div className="problem-sample-test" key={index}>
                <div className="problem-sample-test-input">
                  <span className="problem-sample-test-input-title">
                    Sample Input {index + 1}
                  </span>
                  <pre className="problem-sample-test-input-content">
                    {testcase.input}
                  </pre>
                </div>
                <div className="problem-sample-test-output">
                  <span className="problem-sample-test-output-title">
                    Sample Output {index + 1}
                  </span>
                  <pre className="problem-sample-test-output-content">
                    {testcase.output}
                  </pre>
                </div>
              </div>
            ))}
          {problem.explanation ? (
            <div className="problem-sample-test-explanation">
              <span className="problem-sample-test-explanation-title">
                Explanation :{" "}
              </span>
              <div className="problem-sample-test-explanation-content">
                {problem.explanation}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <CodeEditor
        language={language}
        handleLanguageSelect={handleLanguageSelect}
        darkMode={darkMode}
        handleModeChange={handleModeChange}
        onCodeChange={onCodeChange}
        submit={submit}
        runLoading={runLoading}
        submitLoading={submitLoading}
      />
      <ResultTable results={results} resultRef={resultRef} />
      <br />
      <br />
    </div>
  );
};

export default Problem;
