import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import SplitPane from "react-split-pane";
import styled from "styled-components";
import ProblemDescription from "./ProblemDescription/problemDescription";
import CodeEditor from "./CodeEditor/codeEditor";
import ResultTable from "./ResultTable/resultTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./problem.css";

const Wrapper = styled.div`
  .Resizer {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #000;
    opacity: 0.2;
    z-index: 1;
    -moz-background-clip: padding;
    -webkit-background-clip: padding;
    background-clip: padding-box;
  }

  .Resizer:hover {
    -webkit-transition: all 2s ease;
    transition: all 2s ease;
  }

  .Resizer.horizontal {
    height: 11px;
    margin: -5px 0;
    border-top: 5px solid rgba(255, 255, 255, 0);
    border-bottom: 5px solid rgba(255, 255, 255, 0);
    cursor: row-resize;
    width: 100%;
  }

  .Resizer.horizontal:hover {
    border-top: 5px solid rgba(0, 0, 0, 0.5);
    border-bottom: 5px solid rgba(0, 0, 0, 0.5);
  }

  .Resizer.vertical {
    width: 11px;
    margin: 0 -5px;
    border-left: 5px solid rgba(255, 255, 255, 0);
    border-right: 5px solid rgba(255, 255, 255, 0);
    cursor: col-resize;
  }

  .Resizer.vertical:hover {
    border-left: 5px solid rgba(0, 0, 0, 0.5);
    border-right: 5px solid rgba(0, 0, 0, 0.5);
  }
`;

const Problem = () => {
  const resultRef = useRef(null);
  const bottomRef = useRef(null);
  const [lang, setLang] = useState("C++");
  const [mode, setMode] = useState("Light");
  const [loading, setLoading] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [code, setCode] = useState("");
  const [color, setColor] = useState([]);
  const [problem, setProblem] = useState({});
  const [result, setResult] = useState({});
  const temp = useLocation().pathname.split("&");
  if (!temp[0] || !temp[1]) return <Redirect to="/not-found" />;
  const problemName = temp[0].split("=")[1].trim();
  const difficulty = temp[1].split("=")[1].toLowerCase().trim();
  const [input, setInput] = useState("");
  const [op, setOp] = useState("");
  const [flag, setFlag] = useState(false);

  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;

  const langDB = ["c", "cpp", "java", "py"];
  const langs = ["C", "C++", "Java", "Python"];

  useEffect(() => {
    axios
      .get(`http://localhost:5000/home/problem/${problemName}`)
      .then((res) => {
        setProblem(res.data);
        setLoadingSpinner((prev) => !prev);
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

    return () => {};
  }, []);

  useEffect(() => {
    if (resultRef.current && loading) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  }, [loading]);

  const onChange = (newValue) => {
    setCode(newValue);
  };

  const parseJwt = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  useEffect(() => {
    if (op !== "") {
      const token = localStorage.getItem("x-auth-token");
      const userId = parseJwt(token)._id;

      axios
        .post(
          "http://localhost:5000/home/submission",
          {
            problemName,
            code,
            lang: langDB[langs.indexOf(lang)],
            op,
            input,
            userId,
          },
          {
            headers: {
              "x-auth-token": token,
            },
          }
        )
        .then((res) => {
          setResult(res.data.finalResult);

          if (op === "submit") {
            axios
              .put(
                "http://localhost:5000/home/submission",
                {
                  problem,
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
              .then((result) => console.log("Result: ", result))
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
          }

          setLoading((prev) => !prev);
          let colors = [];
          res.data.finalResult.map((curResult) => {
            if (curResult.AC === true) {
              colors.push("#66BB6A");
            } else {
              colors.push("#EF5350");
            }
          });

          setColor(colors);
          setSubmitted((prev) => !prev);
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
    }
  }, [op, flag]);

  const submit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
      toast.error("Login To Proceed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setSubmitted(false);
      setLoading((prev) => !prev);

      const curOp =
        e.target.innerText !== "Run Code"
          ? "submit"
          : input
          ? "customInput"
          : "runcode";

      if (curOp === op) setFlag((prev) => !prev);
      else {
        e.target.innerText !== "Run Code"
          ? setOp("submit")
          : input
          ? setOp("customInput")
          : setOp("runcode");
      }
    }
  };

  const handleSelect = (eventKey, event) => {
    event.preventDefault();
    console.log(eventKey);
    setLang(langs[eventKey]);
  };

  return (
    <div className="container">
      <ToastContainer />
      <Wrapper>
        <SplitPane
          split="vertical"
          defaultSize="50%"
          minSize={screenWidth * 0.25}
          maxSize={screenWidth * 0.75}
        >
          <div className="left">
            <div className="loading-spinner">
              <BeatLoader
                color={"#343a40"}
                size={30}
                loading={loadingSpinner}
              />
            </div>
            <ProblemDescription problem={problem} />
          </div>
          <div className="right">
            <CodeEditor
              lang={lang}
              handleSelect={handleSelect}
              langs={langs}
              mode={mode}
              setMode={setMode}
              onChange={onChange}
              submit={submit}
              bottomRef={bottomRef}
              input={input}
              setInput={setInput}
            />
            <ResultTable
              resultRef={resultRef}
              loading={loading}
              submitted={submitted}
              result={result}
              color={color}
              input={input}
              op={op}
            />
          </div>
        </SplitPane>
      </Wrapper>
    </div>
  );
};

export default Problem;
