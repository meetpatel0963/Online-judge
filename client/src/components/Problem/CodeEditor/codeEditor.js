import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import AceEditor from "react-ace";
import {
  Button,
  DropdownButton,
  Dropdown,
  Form,
  Collapse,
} from "react-bootstrap";

import * as ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/ext-language_tools";
ace.config.set("basePath", "/ace-builds/src-noconflict");

const CodeEditor = ({
  lang,
  handleSelect,
  langs,
  mode,
  setMode,
  onChange,
  submit,
  bottomRef,
  loading,
  input,
  setInput,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (bottomRef.current && open) {
      setTimeout(() => {
        bottomRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
      }, 250);
    }
  }, [open]);

  return (
    <div>
      <div className="language-theme">
        <div className="language">
          <DropdownButton
            className="language"
            variant="primary"
            id="dropdown-basic-button"
            title={lang}
            onSelect={handleSelect}
          >
            {langs.map((language, i) => (
              <Dropdown.Item key={i} eventKey={i}>
                {language}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        <div className="theme">
          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              style={{ fontFamily: "Philosopher", fontWeight: "bold" }}
              label={
                "Change To " + (mode === "Light" ? "Dark" : "Light") + " Mode"
              }
              onClick={() =>
                setMode((prev) => (prev === "Dark" ? "Light" : "Dark"))
              }
            />
          </Form>
        </div>
      </div>
      <div className="code-editor">
        <AceEditor
          mode={
            lang === "C" || lang === "C++"
              ? "c_cpp"
              : lang === "Java"
              ? "java"
              : "python"
          }
          theme={mode === "Dark" ? "dracula" : "eclipse"}
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          fontSize={17}
          width="100%"
          height="550px"
          highlightActiveLine={true}
          showGutter={true}
          wrapEnabled={true}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
          }}
        />
      </div>
      <div className="submit-btn">
        <Form.Group>
          <Button
            className="custom-input"
            variant="dark"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            Custom Testcase
          </Button>
        </Form.Group>
        <Collapse in={open}>
          <div className="custom-input-text">
            <Form.Label>Custom Input</Form.Label>
            <Form.Control
              as="textarea"
              name="input"
              rows={3}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </Collapse>
        <div ref={bottomRef}></div>
        <div className="runcode-btn-item">
          <Button
            style={{ width: "100%" }}
            variant="primary"
            onClick={submit}
            disabled={loading}
          >
            Run Code
          </Button>
        </div>
        <div className="submit-btn-item">
          <Button
            style={{ width: "100%" }}
            variant="primary"
            onClick={submit}
            disabled={loading}
          >
            Submit &nbsp;
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
