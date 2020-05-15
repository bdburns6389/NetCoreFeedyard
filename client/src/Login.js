import React from "react";
import agent from "./api/agent";
import { Link } from "react-router-dom";
import { useInputChange } from "./helpers/useInputChange";

const Login = () => {
  const [input, handleInputChange] = useInputChange();

  const handleSubmit = async (event) => {
    event.preventDefault();

    var login = await agent.Users.login(input);
    var jwt = login.data.token;
    localStorage.setItem("jwt", jwt);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={input.email || ""}
            onChange={handleInputChange}
          ></input>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={input.password || ""}
            onChange={handleInputChange}
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
