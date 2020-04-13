import React from "react";
import agent from "./api/agent";
import { Link } from "react-router-dom";
import { useInputChange } from "./helpers/useInputChange";

const Register = () => {
  const [input, handleInputChange] = useInputChange();

  const handleSumbit = async (event) => {
    event.preventDefault();

    var register = await agent.Users.register(input);
    var jwt = register.data.token;
    localStorage.setItem("jwt", jwt);
  };

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={input.email || ""}
            onChange={handleInputChange}
          ></input>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={input.username || ""}
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
        <button>Home</button>
      </Link>
    </div>
  );
};

export default Register;
