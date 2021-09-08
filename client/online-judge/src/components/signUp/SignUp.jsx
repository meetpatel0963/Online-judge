import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "react-phone-number-input/style.css";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";

import axios from "axios";
import { Redirect } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BACK_SERVER_URL } from "../../config/config";

import "./signUp.css";

const Copyright = () => {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{ marginTop: "10px" }}
    >
      {"Copyright © "}
      Online Judge {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [description, setDescription] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const validateEmail = (e) => {
    const emailreg =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    if (!e.target.value.match(emailreg))
      setEmailError("Please enter a valid email address!");
    else setEmailError("");
    setEmail(e.target.value);
  };

  const validatePassword = (e) => {
    const passwordreg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/;
    if (!e.target.value.match(passwordreg))
      setPasswordError(
        "Use 8 or more characters with a mix of letters, numbers & symbols :)"
      );
    else setPasswordError("");
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const _contact = parsePhoneNumber(contact);

    axios
      .post(`${BACK_SERVER_URL}/api/auth/signup`, {
        firstName,
        lastName,
        username,
        email,
        contact,
        country: _contact.country,
        password,
        description,
        stats: {
          "totalCount": 0,
          "verdicts": {
            "ACCount": 0,
            "WACount": 0,
            "TLECount": 0,
            "MLECount": 0,
            "CECount": 0,
            "RTECount": 0,
          },
          "tags":{
          },
          "difficulties": {
            "easy": 0,
            "medium": 0,
            "hard": 0,
          }
        },
      })
      .then((res) => {
        setSignedUp(true);
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

  if (signedUp) return <Redirect to="/signin" />;

  return (
    <Grid align="center" className="signup-container">
      <ToastContainer />
      <Paper className="signup-paper">
        <Grid align="center">
          <Avatar className="signup-avatar">
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 className="signup-title">Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <div className="signup-name-container">
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoFocus
              required
            />
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <TextField
            fullWidth
            id="username"
            label="Username"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            helperText={emailError}
            onChange={(e) => validateEmail(e)}
            error={emailError.length > 0}
          />
          <PhoneInput
            id="contact"
            name="contact"
            className="signup-contact"
            placeholder="Enter your contact no."
            value={contact}
            onChange={setContact}
            required
          />
          <TextField
            fullWidth
            label="Password"
            placeholder="Enter your password"
            name="password"
            type="password"
            id="password"
            value={password}
            helperText={passwordError}
            onChange={(e) => validatePassword(e)}
            error={passwordError.length > 0}
          />
          <TextField
            fullWidth
            label="About Yourself"
            placeholder="About Yourself"
            id="description"
            name="description"
            multiline
            rows={3}
            rowsMax={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControlLabel
            style={{ marginTop: "30px" }}
            control={<Checkbox name="checkedA" />}
            label="I accept the terms and conditions."
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "30px" }}
          >
            {loading ? (
              <CircularProgress size={"23px"} style={{ color: "white" }} />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
        <Copyright />
      </Paper>
    </Grid>
  );
};

export default SignUp;
