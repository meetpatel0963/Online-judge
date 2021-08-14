import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { BACK_SERVER_URL } from "../../config/config";

import "./problemset.css";
import "react-toastify/dist/ReactToastify.css";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";
import SearchBar from "material-ui-search-bar";
import { Link } from "react-router-dom";

import Sidebar from "../sidebar/SideBar";
import { getDifficulty } from "../../utils";

const columns = [
  { id: "id", label: "#", minWidth: 10 },
  { id: "name", label: "Problem Name", minWidth: 100 },
  { id: "tags", label: "Tags", minWidth: 200 },
  { id: "difficulty", label: "Difficulty", minWidth: 50 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "950px",
  },
  container: {
    maxHeight: 950,
  },
});

export default function ProblemSet() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [allProblems, setAllProblems] = useState([]);
  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [tagsSelected, setTagsSelected] = useState(false);

  useLayoutEffect(() => {
    axios
      .get(`${BACK_SERVER_URL}/home/problem`)
      .then((res) => {
        let problems = res.data;

        problems.forEach((problem, i) => {
          problem["difficulty"] = getDifficulty(problem);
        });

        setAllProblems(problems);
        setRows(problems);
        setLoader(false);
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
  }, []);

  useEffect(() => {
    const getPageData = () => {
      let filtered = allProblems;
      if (searchQuery) {
        filtered = allProblems.filter((p) =>
          p.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
        setTagsSelected(false);
        setRows(filtered);
      } else if (!tagsSelected) {
        setRows(filtered);
      }
    };
    getPageData();

    // eslint-disable-next-line
  }, [searchQuery, allProblems]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  return (
    <div className="problemset-container">
      <ToastContainer />
      <div className="problemset-left">
        <Sidebar
          problems={allProblems}
          setRows={setRows}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          tagsSelected={tagsSelected}
          setTagsSelected={setTagsSelected}
        />
      </div>
      <div className="problemset-right">
        <SearchBar
          value={searchQuery}
          onChange={(newValue) => setSearchQuery(newValue)}
          onRequestSearch={() => setSearchQuery(searchQuery)}
          className="problem-searchbar"
        />
        <div className="problemset-spinner">
          <BeatLoader color={"#343a40"} size={30} loading={loader} />
        </div>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value =
                            column.id === "id" ? index + 1 : row[column.id];
                          if (column.id === "tags") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <div
                                  style={{ display: "flex", columnGap: "5px" }}
                                >
                                  {value.map((tag, i) => (
                                    <Chip
                                      key={i}
                                      label={tag}
                                      variant="outlined"
                                      color="primary"
                                      style={{ display: "flex" }}
                                    />
                                  ))}
                                </div>
                              </TableCell>
                            );
                          } else if (column.id === "difficulty") {
                            let badgeColor = "#FF980d";

                            if (value === "Easy") badgeColor = "#5caf5c";
                            else if (value === "Hard") badgeColor = "#F44336";

                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Chip
                                  label={value}
                                  style={{
                                    fontWeight: "bold",
                                    color: "white",
                                    display: "flex",
                                    backgroundColor: badgeColor,
                                  }}
                                />
                              </TableCell>
                            );
                          } else if (column.id === "name") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Link
                                  to={`/problem/${value}`}
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    textDecoration: "none",
                                    color: "#1a237e",
                                  }}
                                >
                                  {value}
                                </Link>
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    color: "#1a237e",
                                  }}
                                >
                                  {value}
                                </span>
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
