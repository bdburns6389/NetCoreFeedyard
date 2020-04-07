import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${baseUrl}/user/login`, {
        email: email,
        password: password,
      })
      .then((response) => localStorage.setItem("jwt", response.data.token));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleEmailChange}
            value={email}
          ></input>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handlePasswordChange}
            value={password}
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link to="/">
        <button>Main Page</button>
      </Link>
    </div>
  );
};

export default Login;
