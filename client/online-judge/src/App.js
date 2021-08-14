import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ProblemSet from "./components/problemset/ProblemSet";
import Problem from "./components/problem/Problem";
import NavBar from "./components/navbar/NavBar";
import SignUp from "./components/signUp/SignUp";
import Verify from "./components/signUp/Verify";
import SignIn from "./components/signIn/SignIn";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";
import UserSubmission from "./components/userSubmission/UserSubmission";

const App = () => {
  return (
    <div style={{ backgroundColor: "#282c34", height: "100%" }}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/problemset" component={ProblemSet} />
          <Route exact path="/problem/:name" component={Problem} />
          <Route exact path="/usersubmission" component={UserSubmission} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/verify" component={Verify} />
          <Redirect from="/" exact to="/problemset" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
