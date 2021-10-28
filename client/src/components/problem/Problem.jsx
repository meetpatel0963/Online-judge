import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import Chip from "@material-ui/core/Chip";

import { BACK_SERVER_URL, JUDGE_URL } from "../../config/config";

import CodeEditor from "./codeEditor/CodeEditor";
import ResultTable from "./resultTable/ResultTable";

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
    const problemId = props.match.params.id;

    axios
      .get(`${BACK_SERVER_URL}/api/problem/${problemId}`)
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
  }, [props.match.params.id]);

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
    if(token === "" || token === null) return null;
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64)).sub;
  };

  const submit = (e) => {
    e.preventDefault();
    const operation = e.currentTarget.value.toString();
    if (operation === "runcode") setRunLoading(true);
    else setSubmitLoading(true);

    const accessToken = localStorage.getItem("access-token");
    const userId = parseJwt(accessToken);
    
    axios
      .post(`${JUDGE_URL}/api/evaluate`, {
        problemId: problem.id,
        problemName: problem.name,
        code: code,
        language: languageExtention[language],
        operation: operation,
      }, { headers: {"Authorization" : `Bearer ${accessToken}`} })
      .then((res) => {
        if (operation === "runcode") setRunLoading(false);
        else {
          setRunLoading(false);
          setSubmitLoading(false);
          axios
            .post(
              `${BACK_SERVER_URL}/api/submission`,
              {
                problemName: problem.name,
                code,
                language: languageExtention[language],
                userId,
                verdict: res.data.verdict,
                result: res.data.result,
              },
              { headers: {"Authorization" : `Bearer ${accessToken}`} }
            )
            .then(() => {})
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
        setResults(res.data.result);

        if (resultRef.current) {
          resultRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        }
      })
      .catch((err) => {
        setRunLoading(false);
        setSubmitLoading(false);
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
  ) : loading ? (
    <div className="problem-loading-spinner">
      <BeatLoader color={"#343a40"} size={30} loading={loading} />
    </div>
  ) : (
    <div>
      <div className="problem-container">
        <ToastContainer />
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
          {problem.sampleTestcases &&
            problem.sampleTestcases.map((testcase, index) => (
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
