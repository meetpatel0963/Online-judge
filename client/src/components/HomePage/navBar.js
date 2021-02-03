import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Nav, Navbar, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link as link } from "react-router-dom";
import { AuthContext } from "../../authContext";

const navBar = () => {
  const appContext = useContext(AuthContext);
  const { login, setLogin } = appContext;

  const handleSelect = (e) => {
    e.preventDefault();
  };
  const handleClick = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("x-auth-token");
    setLogin(false);
    window.location = "/";
  };

  return (
    <div>
      <Navbar
        style={{
          position: "fixed",
          top: 0,
          width: 100 + "%",
          zIndex: 1000,
          fontFamily: "Yusei Magic",
          letterSpacing: "1px",
          fontSize: "16px",
        }}
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand
          href="#home"
          style={{
            fontFamily: "philosopher",
            fontWeight: "bold",
          }}
        >
          Online Judge
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={link} to="/problemset" onSelect={handleSelect}>
            Problemset
          </Nav.Link>
          <Nav.Link as={link} to="/createproblem" onSelect={handleSelect}>
            Create Problem
          </Nav.Link>
          {login ? (
            <Nav.Link as={link} to="/mysubmission" onSelect={handleSelect}>
              My Submissions
            </Nav.Link>
          ) : null}
        </Nav>
        <Form inline>
          {login ? (
            <Button
              variant="danger"
              className="signin-logout-btn"
              onClick={handleClick}
            >
              Logout <FontAwesomeIcon icon={faSignOutAlt} />
            </Button>
          ) : useLocation().pathname !== "/signIn" ? (
            <Button
              variant="warning"
              className="signin-logout-btn"
              as={link}
              to="/signIn"
            >
              SignIn <FontAwesomeIcon icon={faSignInAlt} />
            </Button>
          ) : null}
          {login ? (
            <Nav.Link
              as={link}
              to="/dashboard"
              onSelect={handleSelect}
              style={{ padding: "0" }}
            >
              <FontAwesomeIcon
                icon={faUserCircle}
                style={{
                  color: "#fff",
                  margin: "0 30px 0 20px",
                  fontSize: "35px",
                  cursor: "pointer",
                }}
              />
            </Nav.Link>
          ) : null}
        </Form>
      </Navbar>
    </div>
  );
};

export default navBar;
