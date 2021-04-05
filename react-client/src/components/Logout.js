import React, { useEffect } from "react";
import ReactSpinner from "react-bootstrap-spinner";

function Logout() {
  useEffect(() => {
    localStorage.removeItem("authKey");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedInName");
    localStorage.setItem("screen", "auth");
    localStorage.removeItem("loggedInId");
    window.location.pathname = "/";
  }, []); //only the first render
  return (
    <div className="h-100 w-100 d-flex justify-content-around align-items-center">
      <ReactSpinner type="border" color="primary" size="10" />
    </div>
  ); 
}

export default Logout;
