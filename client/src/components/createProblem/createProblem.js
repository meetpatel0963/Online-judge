import React, { useState, useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import {
  Form,
  Button as ReactButton,
  Row,
  Col,
  Collapse,
  Table,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faPaperPlane,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import "react-toastify/dist/ReactToastify.css";
import "./createProblem.css";
import mathquill4quill from "mathquill4quill";
import "mathquill4quill/mathquill4quill.css";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import { BACK_SERVER_URL } from "../../config/config";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const SampleTestcase = ({ i, input, output, setInput, setOutput }) => {
  return (
    <div>
      <Table>
        <tbody>
          <tr
            style={{
              fontFamily: "Yusei Magic",
              fontWeight: "bold",
              fontSize: "18px",
              color: "green",
            }}
          >
            Sample {i + 1}
          </tr>
          <br />
          <tr>
            <Form.Group className="input-output">
              <Form.Label
                style={{ fontFamily: "Yusei Magic", fontWeight: "bold" }}
              >
                Sample Input #{i + 1}
              </Form.Label>
              <Form.Control
                as="textarea"
                name={"input" + (i + 1)}
                rows={3}
                onChange={(e) => setInput([...input, e.target.value])}
              />
              <br />
              <Form.Label
                style={{ fontFamily: "Yusei Magic", fontWeight: "bold" }}
              >
                Sample Output #{i + 1}
              </Form.Label>
              <Form.Control
                as="textarea"
                name={"output" + (i + 1)}
                rows={3}
                onChange={(e) => setOutput([...output, e.target.value])}
              />
            </Form.Group>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

const LightTooltip = withStyles((theme) => ({
  arrow: {
    color: "rgba(0, 0, 0, 0.83)",
  },
  tooltip: {
    backgroundColor: "rgba(0, 0, 0, 0.83)",
    color: "#fff",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const CreateProblem = () => {
  const [input, setInput] = useState([]);
  const [output, setOutput] = useState([]);
  const [problemStatement, setProblemStatement] = useState("");
  const [children, setChildren] = useState([]);
  const [problemName, setProblemName] = useState("");
  const [testCaseFile, setTestCaseFile] = useState("");
  const [solutionFile, setSolutionFile] = useState("");
  const [explanation, setExplanation] = useState("");
  const [time, setTime] = useState(0);
  const [memory, setMemory] = useState(0);
  const [open, setOpen] = useState(false);
  const [currentTags, setCurrentTags] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const classes = useStyles();
  const reactQuill = useRef();

  const tags = [
    "Binary Search",
    "Bitmasks",
    "Bruteforce",
    "Combinatorics",
    "Constructive Algorithms",
    "Data Structures",
    "DFS and Similar",
    "Divide and Conquer",
    "Dynamic Programming",
    "DSU",
    "Flows",
    "Games",
    "Graphs",
    "Greedy",
    "Implementation",
    "Math",
    "Number Theory",
    "Shortest Paths",
    "Sortings",
    "Ternery Search",
    "Trees",
    "Two Pointers",
  ];

  const handleChange = (value) => {
    setProblemStatement(value);
  };

  const handleTagSelect = (tag) => {
    let newTags;
    if (!currentTags.includes(tag)) {
      newTags = [tag, ...currentTags];
    } else {
      newTags = currentTags.filter((curTag) => curTag !== tag);
    }

    setCurrentTags(newTags);
  };

  const addTestcase = () => {
    setChildren(
      children.concat(
        <SampleTestcase
          key={children.length}
          i={children.length}
          input={input}
          setInput={setInput}
          output={output}
          setOutput={setOutput}
        />
      )
    );
  };

  const handleDelete = () => {
    let newChildren = children;
    newChildren.splice(-1);
    setChildren([...newChildren]);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setLoadingSpinner(true);

    let sampleTestcase = [];
    for (let i = 0; i < input.length; i++) {
      sampleTestcase.push({
        input: input[i],
        output: output[i],
      });
    }

    const formData = new FormData();
    formData.append("problemName", problemName);
    formData.append("sampleTestcase", JSON.stringify(sampleTestcase));
    formData.append("testcaseFile", testCaseFile);
    formData.append("problemStatement", problemStatement);
    formData.append("explanation", explanation);
    formData.append("tags", JSON.stringify(currentTags));
    formData.append("time", time);
    formData.append("memory", memory);
    formData.append("solutionFile", solutionFile);
    formData.append("author", localStorage.getItem("username"));

    const token = localStorage.getItem("x-auth-token");

    axios
      .post(`${BACK_SERVER_URL}/home/createProblem`, formData, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setLoadingSpinner(false);
        toast.success("Problem Submitted Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        setLoadingSpinner(false);
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

  const modules = { formula: true };
  modules.toolbar = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const formats = [
    "header",
    "font",
    "background",
    "code",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "script",
    "align",
    "direction",
    "link",
    "image",
    "code-block",
    "formula",
    "video",
  ];

  useEffect(() => {
    const enableMathQuillFormulaAuthoring = mathquill4quill({ Quill });
    enableMathQuillFormulaAuthoring(reactQuill.current);
  }, []);

  return (
    <div
      className="container"
      style={{
        paddingTop: 70 + "px",
      }}
    >
      <ToastContainer />
      <Form onSubmit={onFormSubmit} autoComplete="off">
        <Form.Group>
          <Form.Label style={{ fontFamily: "Yusei Magic", fontWeight: "bold" }}>
            Problem Name
          </Form.Label>
          <Form.Control
            type="text"
            name="problemName"
            value={problemName}
            placeholder="Problem Name"
            onChange={(e) => {
              setProblemName(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group>
          <div>
            <Form.Label
              style={{ fontFamily: "Yusei Magic", fontWeight: "bold" }}
            >
              Problem Statement
            </Form.Label>
            <span style={{ float: "right" }}>
              <FontAwesomeIcon icon={faInfoCircle} />{" "}
              <a
                target="_blank"
                style={{ textDecoration: "none" }}
                href="https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference"
              >
                Guide For Math Formulas
              </a>
            </span>
          </div>
          <ReactQuill
            ref={reactQuill}
            modules={modules}
            formats={formats}
            theme="snow"
            value={problemStatement}
            onChange={handleChange}
            style={{
              wordBreak: "break-all",
              backgroundColor: "#fff",
              marginBottom: "20px",
            }}
            placeholder="Click here to insert text..."
          />
        </Form.Group>
        <Form.Group>{children}</Form.Group>
        <Form.Group>
          <div style={{ display: "flex", gap: "15px" }}>
            <Button
              variant="contained"
              color="primary"
              variant="contained"
              style={{
                color: "#fff",
                width: "80%",
              }}
              size="large"
              onClick={addTestcase}
              type="button"
            >
              <FontAwesomeIcon icon={faPlus} /> &nbsp; Add Sample Testcase
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ color: "#fff", width: "20%" }}
              size="large"
              onClick={handleDelete}
              disabled={children.length === 0}
              type="button"
            >
              Delete &nbsp; <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ fontFamily: "Yusei Magic", fontWeight: "bold" }}>
            Explanation
          </Form.Label>
          <Form.Control
            type="text"
            name="explanation"
            value={explanation}
            placeholder="Explanation"
            onChange={(e) => {
              setExplanation(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <ReactButton
            variant="dark"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            type="button"
          >
            Add Tags
          </ReactButton>
          <Collapse in={open}>
            <div>
              {tags.map((tag) => (
                <a
                  key={tag}
                  className="createproblem-tags-btn"
                  style={{
                    backgroundColor: currentTags.includes(tag)
                      ? "#17a2b8"
                      : "#fff",
                    padding: "10px",
                  }}
                  onClick={() => handleTagSelect(tag)}
                >
                  <span
                    className="text-sm text-gray"
                    style={{
                      color: currentTags.includes(tag) ? "#fff" : "#000",
                      fontSize: "13px",
                    }}
                  >
                    {tag}
                  </span>
                </a>
              ))}
            </div>
          </Collapse>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                placeholder="Time (in Seconds)"
                type="number"
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Memory (in MegaBytes)"
                type="number"
                onChange={(e) => setMemory(e.target.value)}
                required
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <div>
            <Form.File
              style={{
                fontFamily: "Yusei Magic",
                fontWeight: "bold",
                display: "inline-block",
              }}
              type="file"
              id="testcases"
              label={
                <>
                  Testcase File &nbsp; &nbsp; &nbsp; &nbsp; [TestFile Format]{" "}
                  <LightTooltip
                    placement="right"
                    title={
                      <span
                        style={{
                          fontFamily: "philosopher",
                          fontSize: "14px",
                        }}
                      >
                        <p>Input</p>
                        <p>1</p>
                        <p>5</p>
                        <p>1 2 3 4 5 6 7 8 9 10</p>
                        <p>Output</p>
                        <p>55</p>
                      </span>
                    }
                    arrow
                  >
                    <IconButton aria-label="delete" color="black">
                      <InfoIcon />
                    </IconButton>
                  </LightTooltip>
                </>
              }
              name="testcaseFile"
              accept=".txt"
              onChange={(e) => {
                const file = e.target.files[0];
                setTestCaseFile(file);
              }}
              required
            />
            <span style={{ display: "inline-block" }}></span>
          </div>
        </Form.Group>
        <Form.Group>
          <Form.File
            style={{ fontFamily: "Yusei Magic", fontWeight: "bold" }}
            type="file"
            id="solution"
            label="Solution File"
            name="solutionFile"
            accept=".cpp,.c,.java,.py"
            onChange={(e) => {
              const file = e.target.files[0];
              setSolutionFile(file);
            }}
            required
          />
        </Form.Group>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={problemStatement === "" || currentTags.length === 0}
          style={{ width: "150px", marginBottom: "20px" }}
        >
          {loadingSpinner ? (
            <CircularProgress size={"23px"} style={{ color: "white" }} />
          ) : (
            "Submit"
          )}
          &nbsp;
          {loadingSpinner ? null : <FontAwesomeIcon icon={faPaperPlane} />}
        </Button>
      </Form>
    </div>
  );
};

export default CreateProblem;
