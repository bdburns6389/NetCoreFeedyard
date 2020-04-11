import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Login from "./Login";
import Register from "./Register";
import "./style.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </div>
  </Router>,
  document.getElementById("root")
);
