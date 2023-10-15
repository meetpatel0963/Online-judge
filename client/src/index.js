import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContext } from "./authContext";

const AppWrapper = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("login")) === true) setLogin(true);
    return () => {};
  }, []);

  return (
    <React.StrictMode>
      <AuthContext.Provider value={{ login, setLogin }}>
        <App />
      </AuthContext.Provider>
    </React.StrictMode>
  );
};

window.addEventListener('error', function (event) {
  // Check if the error message contains the specific text you want to ignore
  if (event.message.includes('SyntaxError')) {
    // You can log the error for debugging purposes if needed
    console.error('Caught an error:', event.error);

    // Optionally, you can prevent the error from crashing the application
    event.preventDefault();
  }
});

ReactDOM.render(<AppWrapper />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
