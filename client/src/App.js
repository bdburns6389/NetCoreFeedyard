import React, { useEffect, useState } from "react";
import agent from "./api/agent";
import { Link } from "react-router-dom";

const App = () => {
  const [feedlots, setFeedlot] = useState([{}]);

  const getFeedlots = async () => {
    const feedlots = await agent.Feedlots.list();
    setFeedlot(feedlots);
  };

  useEffect(() => {
    getFeedlots();
  }, []);

  const renderFeedlots = () => {
    if (!feedlots) return <div>Loading...</div>;
    return feedlots.map((feedlot) => (
      <div key={feedlot.id}>{feedlot.name}</div>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        {renderFeedlots()}
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </header>
    </div>
  );
};

export default App;
