import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import SignUp from "./components/HomePage/signUp";
import SignIn from "./components/HomePage/signIn";
import ProblemSet from "./components/ProblemSet/problemset";
import Problem from "./components/Problem/problem";
import CreateProblem from "./components/createProblem/createProblem";
import Dashboard from "./components/Dashboard/dashboard";
import NavBar from "./components/HomePage/navBar";
import Verify from "./components/HomePage/verify";
import MySubmission from "./components/MySubmission/mySubmission";
import NotFound from "./components/notFound.js";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/problemset" component={ProblemSet} />
        <Route exact path="/problem/:name" component={Problem} />
        <ProtectedRoute exact path="/createproblem" component={CreateProblem} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/signUp" component={SignUp} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/mysubmission" component={MySubmission} />
        <Route exact path="/verify" component={Verify} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect from="/" exact to="/problemset" />
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
};

export default App;
