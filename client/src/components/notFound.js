import React from "react";
import "./notFound.css";

const NotFound = () => {
  return (
    <div
      style={{
        paddingTop: "50px",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <div className="four_zero_four_bg">
        <h1 className="text-center">404</h1>
      </div>

      <div className="contant_box_404">
        <div className="404-item-1">
          <h3
            style={{
              fontFamily: "Yusei Magic",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            Looks like you're lost
          </h3>
        </div>
        <div className="404-item-2">
          <p style={{ fontFamily: "Yusei Magic", fontSize: "20px" }}>
            The page you are looking for is not avaible!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
