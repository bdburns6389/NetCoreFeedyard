import React, { useState } from "react";
import agent from "./api/agent";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSumbit = async (event) => {
    event.preventDefault();
    const user = { email, password, username };
    var register = await agent.Users.register(user);
    var jwt = register.data.token;
    localStorage.setItem("jwt", jwt);
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
