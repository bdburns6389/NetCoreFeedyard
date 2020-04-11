import React, { useEffect, useState } from "react";
import agent from "./api/agent";
import { Link } from "react-router-dom";

function App() {
  const [feedlots, setFeedlot] = useState([{}]);

  // TODO User grid on a separate login page (3 by 3, and the box will be the center one.)
  useEffect(() => {
    const getFeedlots = async () => {
      const feedlots = await agent.Feedlots.list();
      setFeedlot(feedlots);
    };
    getFeedlots();
  }, []);

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
