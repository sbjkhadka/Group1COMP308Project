import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import axios from "axios";

function Home() {
  
  const [screen, setScreen] = useState(localStorage.getItem('screen') || "auth");
  const [credential, setcredential] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    e.persist();
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };

  const authenticateUser = (e) => {
    e.persist();
    e.preventDefault();
    console.log("current_credentials", credential);
    // Using absolute URL because it will be absolute in production
    const apiUrl = "http://localhost:5000/login";
    const data = {
      email: credential.email,
      password: credential.password,
    };

    console.log("user sent", data);
    axios
      .post(apiUrl, data)
      .then((res) => {
        console.log("logged_in_successfully", res);
        if (res.data.screen !== undefined) {
          console.log(res);
          localStorage.setItem("authKey", res.data.token);
          // localStorage.setItem("loggedIn", res.data.studentId);
          localStorage.setItem(
            "loggedInName",
            res.data.firstName + " " + res.data.lastName
          );
          setScreen(res.data.screen);
          localStorage.setItem("screen", res.data.screen);
          window.location.pathname = "/";
        }
      })
      .catch((error) => {
        console.log("error_happened", error);
        // setToastMessage("Something went wrong!");
        // setShow(true);
        // setShowLoading(false);
      });
  };

  const readCookie = async () => {
    try {
      console.log("--- in readCookie function ---");
      axios
        .post("http://localhost:5000/checkIdAnyUserIsAlreadySignedIn", {
          authKey: localStorage.getItem("authKey"),
        })
        .then((res) => {
          if (res.data.screen !== undefined) {
            setScreen(res.data.screen);
            console.log(res.data.screen);
          }
        });
    } catch (e) {
      setScreen("auth");
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    if(screen === "auth") {
      readCookie();
    }
    
  }, []); //only the first render
  return (
    <div className="d-flex justify-content-around align-items-center h-100 p-5 blank-space-filler">
      {screen === "auth" ? (
          <div className="w-25 border rounded p-5 form-background">
            <h1 className="topic-color d-flex justify-content-around rounded">
              Login
            </h1>

            <Form onSubmit={authenticateUser}>
              <div className="row">
                <Form.Group className="col-md-12">
                  <Form.Label className="topic-color">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </div>

              <div className="row">
                <Form.Group className="col-md-12">
                  <Form.Label className="topic-color">Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={onChange}
                    required
                  />
                </Form.Group>
              </div>

              <Button variant="danger" type="submit" className="col-md-12">
                Login
              </Button>
            </Form>
          </div>
      ) : (
        <div>I am already signed in</div>
      )}
    </div>
  );
}

export default Home
