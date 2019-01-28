import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TextField from "./TextField";

const validations = [
  "required",
  "email",
  {
    isValid: input => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(input.indexOf("sum") > -1);
        }, 1000);
      });
    },
    async: true,
    errorMessage: "Must contain sum"
  },
  {
    isValid: input => input.length > 10,
    errorMessage: "Should be longer than 10"
  }
];

function App() {
  return (
    <div className="App">
      <TextField
        onChange={console.log}
        label="Email address"
        validations={validations}
      />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
