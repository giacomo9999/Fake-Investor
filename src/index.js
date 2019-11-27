import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

const Index = () => {
  return (
    <div className="container-outer">
      <h1>HELLO WORLD</h1>
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
