import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const baseUrl = process.env.REACT_APP_API_URL;
  const [feedlots, setFeedlot] = useState([{}]);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    axios
      .get(`${baseUrl}/feedlot`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFeedlot(res.data));
  }, [baseUrl]);

  const renderFeedlots = () => {
    return feedlots.map((feedlot) => {
      return <div>{feedlot.name}</div>;
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        {renderFeedlots()}

        <button onClick={() => alert(JSON.stringify(feedlots))}>Click</button>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </header>
    </div>
  );
}

export default App;
