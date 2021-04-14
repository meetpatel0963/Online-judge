import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProblemList = ({ problems, currentPage, pageSize }) => {
  return (
    <Table bordered hover responsive className="text-center">
      <thead className="bg-dark text-white">
        <tr>
          <th style={{ width: 7 + "%", fontSize: 22 + "px" }}>#</th>
          <th style={{ fontSize: 22 + "px" }}>Problem Name</th>
          <th style={{ width: 15 + "%", fontSize: 22 + "px" }}>Difficulty</th>
        </tr>
      </thead>
      <tbody style={{ fontSize: 18 + "px" }}>
        {problems.map((problem, i) => (
          <tr key={i}>
            <td>{(currentPage - 1) * pageSize + i + 1}</td>
            <td>
              <div style={{ textAlign: "left" }}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/problem/name=${problem["name"]}&difficulty=${problem["difficulty"]}`}
                >
                  {problem["name"]}
                </Link>
              </div>
              <div style={{ fontSize: "14px", textAlign: "right" }}>
                {problem["tags"].map((tag, index) => {
                  return [
                    <span>
                      {tag}
                      {index < problem["tags"].length - 1 ? ", " : null}
                    </span>,
                  ];
                })}
              </div>
            </td>
            <td>
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  color: "#fff",
                  borderRadius: 15 + "px",
                  width: 80 + "px",
                  backgroundColor:
                    problem.difficulty === "Hard"
                      ? "#F44336"
                      : problem.difficulty === "Medium"
                      ? "#FF9800"
                      : "#5cb85c",
                }}
              >
                {problem.difficulty}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProblemList;
