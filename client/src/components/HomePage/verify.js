import React from "react";
import Card from "@material-ui/core/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Verify = () => {
  return (
    <div
      className="verify"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Card
        style={{
          width: "800px",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#263238",
          color: "white",
        }}
      >
        <div
          style={{
            fontFamily: "cursive",
            transform: "capitalize",
            display: "block",
            padding: "40px",
          }}
        >
          <p style={{ fontSize: "25px" }}>
            <FontAwesomeIcon
              style={{ color: "#00B74A" }}
              icon={faCheckCircle}
            />{" "}
            A verification link has been sent to your Email Account
          </p>
          <hr style={{ backgroundColor: "#fff" }} />
          <p style={{ fontSize: "20px" }}>
            Please click on the link that has just been sent to your email
            account to verify your email address.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Verify;
