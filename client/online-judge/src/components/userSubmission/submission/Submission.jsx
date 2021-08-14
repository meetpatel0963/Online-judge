import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./submission.css";

const Submission = ({ submission }) => {
  return (
    <div className="submission-container">
      <SyntaxHighlighter
        showLineNumbers={true}
        language={submission.lang}
        style={a11yDark}
      >
        {submission.code}
      </SyntaxHighlighter>
    </div>
  );
};

export default Submission;
