import React, { useState } from "react";
import agent from "./api/agent";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = { email, password };
    var login = await agent.Users.login(user);
    var jwt = login.data.token;
    localStorage.setItem("jwt", jwt);
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
