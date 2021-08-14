import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIncon from "@material-ui/icons/HighlightOff";

import "./resultTable.css";

const useStyles = makeStyles({
  table: {
    minWidth: 150,
  },
});

const ResultTable = ({ results, resultRef }) => {
  const classes = useStyles();
  const verdictMap = {
    AC: "Accepted",
    WA: "Wrong Answer",
    CE: "Compilation Error",
    RTE: "Runtime Error",
    TLE: "Time Limit Exceeded",
    MLE: "Memory Limit Exceeded",
  };

  return (
    <TableContainer
      component={Paper}
      className="result-table-container"
      ref={resultRef}
    >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className="result-table-header">
              #
            </TableCell>
            <TableCell align="center" className="result-table-header">
              Verdict
            </TableCell>
            <TableCell align="center" className="result-table-header">
              Time
            </TableCell>
            <TableCell align="center" className="result-table-header">
              Memory
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((result, index) => {
            return [
              <TableRow key={index}>
                <TableCell align="center" className="result-table-content">
                  {index + 1}
                </TableCell>
                <TableCell align="center" className="result-table-content">
                  <span style={{ alignItems: "center" }}>
                    {verdictMap[result.verdict]}
                    {result.verdict === "AC" ? (
                      <CheckCircleIcon className="result-table-accepted-icon" />
                    ) : (
                      <CancelIncon className="result-table-error-icon" />
                    )}
                  </span>
                </TableCell>
                <TableCell align="center" className="result-table-content">
                  {result.time} ms
                </TableCell>
                <TableCell align="center" className="result-table-content">
                  {result.memory / 1000} MB
                </TableCell>
              </TableRow>,
            ];
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
