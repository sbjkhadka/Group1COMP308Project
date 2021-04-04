import './App.css';
import Sidebar from "./components/Sidebar";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Logout from "./components/Logout";

function App() {
  return (
    <div className="App">
      <div className="customHeader">
        <img src={process.env.PUBLIC_URL + "/cover.png"} alt="Logo" />
      </div>
      <div className="bodyPart">
        <Sidebar />
        <div className="playGround">
          <Router>
            <Route exact path="/" component={Home} />
            <Route render={() => <Signup />} path="/signup" />
            <Route render={() => <Logout />} path="/logout" />
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
