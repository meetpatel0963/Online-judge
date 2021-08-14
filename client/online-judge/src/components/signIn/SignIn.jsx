import React, { useState, useContext } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { Redirect } from "react-router";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACK_SERVER_URL } from "../../config/config";
import { AuthContext } from "../../authContext";
import axios from "axios";

import "./signIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const appContext = useContext(AuthContext);
  const { login, setLogin } = appContext;

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    
    axios
      .post(`${BACK_SERVER_URL}/home/auth`, {
        email,
        password,
      })
      .then((res) => {
        const user = res.data;
        localStorage.setItem("x-auth-token", res.headers["x-auth-token"]);
        localStorage.setItem("login", true);
        localStorage.setItem("username", user.firstName + " " + user.lastName);
        setLogin(true);
      })
      .catch((err) => {
        setLoading(false);
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

  if (login) return <Redirect to="/" />;

  return (
    <Grid align="center" className="signin-container">
      <ToastContainer />
      <Paper className="signin-paper">
        <Grid align="center">
          <Avatar className="signin-avatar">
            <LockOutlinedIcon />
          </Avatar>
          <h2 className="signin-title">Sign In</h2>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter username/email"
          id="username"
          name="username"
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          fullWidth
          required
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className="signin-btn"
          onClick={handleSignIn}
          fullWidth
        >
          {loading ? (
            <CircularProgress size={"23px"} style={{ color: "white" }} />
          ) : (
            "Sign In"
          )}
        </Button>
        <Typography>
          Do you have an account?
          <Link href="/signup" style={{ margin: "5px", cursor: "pointer" }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SignIn;
