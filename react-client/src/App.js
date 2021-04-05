import './App.css';
import Sidebar from "./components/Sidebar";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Logout from "./components/Logout";
import RecordVitals from "./components/RecordVitals";
import MyVitals from './components/MyVitals';
import ViewPatientVital from './components/ViewPatientVital';
import SendHealthTips from './components/SendHealthTips';

function App() {
  const screen = localStorage.getItem('screen');
  let colorClass = "auth";
  if(screen === "auth") {
    colorClass = "auth"
  } else if (screen === "nurse") {
    colorClass = "nurse";
  } else if (screen === "patient") {
    colorClass = "patient";
  }
  return (
    <div className="App">
      <div className="customHeader">
        <img src={process.env.PUBLIC_URL + "/cover.png"} alt="Logo" />
        <span>Welcome {localStorage.getItem("loggedInName")}</span>
      </div>
      <div className="bodyPart">
        <Sidebar />
        <div className="playGround" id={colorClass}>
          <Router>
            <Route exact path="/" component={Home} />
            <Route render={() => <Signup />} path="/signup" />
            <Route render={() => <Logout />} path="/logout" />
            <Route render={() => <RecordVitals />} path="/createVitals" />
            <Route render={() => <MyVitals />} path="/myVitals" />
            <Route render={() => <ViewPatientVital />} path="/viewVitals" />
            <Route render={() => <RecordVitals />} path="/recordMyVitals" />
            <Route render={() => <SendHealthTips />} path="/sendHealthTips" />
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
