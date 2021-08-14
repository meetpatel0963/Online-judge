import React from "react";
import Card from "@material-ui/core/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./verify.css";

const Verify = () => {
  return (
    <div className="verify-container">
      <Card className="verify-card">
        <div>
          <p className="verify-title">
            <FontAwesomeIcon icon={faCheckCircle} className=" verify-icon" />A verification link has been
            sent to your Email Account
          </p>
          <hr />
          <p className="verify-content">
            Please click on the link that has been sent to your email
            account to verify your email address.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Verify;
