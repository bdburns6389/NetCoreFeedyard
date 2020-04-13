import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Login from "./Login";
import Register from "./Register";
import "./style.css";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </div>
  </Router>,
  document.getElementById("root")
);
