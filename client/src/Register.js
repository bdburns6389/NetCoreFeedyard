import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSumbit = (event) => {
    event.preventDefault();
    axios
      .post(`${baseUrl}/user/register`, {
        email: email,
        password: password,
        username: username,
      })
      .then((response) => localStorage.setItem("jwt", response.data.token));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          ></input>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          ></input>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default Register;
