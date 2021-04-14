import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Card from "react-bootstrap/Card";
import {ResourceList} from "./useFulResource";
import socketIOClient from "socket.io-client";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

function Home() {
 const [messages, setMessages] = useState([]);
  
  const [screen, setScreen] = useState(localStorage.getItem('screen') || "auth");
  const [credential, setcredential] = useState({
    email: "",
    password: "",
  });
  const [tips, setTips] = useState([]);
  const [activeTip, setActiveTip] = useState({title:"", message:"", resourceLink:""});

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
          console.log(res.data.id);
          localStorage.setItem("authKey", res.data.token);
          // localStorage.setItem("loggedIn", res.data.studentId);
          localStorage.setItem(
            "loggedInName",
            res.data.firstName + " " + res.data.lastName
          );
          localStorage.setItem(
            "loggedInId",
            res.data.id
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

  const readTips = async () => {
    const apiUrl = "http://localhost:5000/readTips";
    const data = {
      patientId: localStorage.getItem('loggedInId'),
    };
        try {
          axios
            .post(apiUrl, data)
            .then((res) => {
               console.log(res.data);
               setTips(res.data);
               if(res.data.length > 0) {
                 setActiveTip(res.data[res.data.length - 1]);
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
    } else if (screen === "patient") {
      readTips();
    }


     const socket = socketIOClient("http://localhost:5001");
 
     socket.on("message", (data) => {
       setMessages(messages=>[...messages, data]);
       console.log(messages);
     });

     socket.on("fire", (data) => {
       setMessages((messages) => [...messages, data]);
       console.log(messages);
     });


    
  }, []); //only the first render

  
  return (
    <div className="d-flex justify-content-around align-items-center h-100 mh-100 p-5">
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
        <div className="w-100 h-100 mh-100">
          {screen === "patient" ? (
            <div className="d-flex flex-column justify-content-start h-100 mh-100 align-self-top w-100">
              <div className=" h-50 w-100">
                <Jumbotron fluid>
                  <Container>
                    <h1>{activeTip.title}</h1>
                    <p>{activeTip.message}</p>
                    <p>
                      <a href={activeTip.resourceLink} target="_blank">
                        Open External Resource
                      </a>
                    </p>
                  </Container>
                </Jumbotron>
              </div>
              <div className="h-50 w-100">
                <h1 className="mt-5">Inbox</h1>
                <Table striped bordered hover size="sm" className=" mt-3">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tips
                      .slice(0)
                      .reverse()
                      .map((val, key) => {
                        return (
                          <tr key={key} onClick={() => setActiveTip(val)}>
                            <td>{key + 1}</td>
                            <td>
                              {new Date(val.created).toLocaleDateString()}
                            </td>
                            <td>{val.title}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column flex-wrap justify-content-around mh-100 overflow-auto">
              {messages
                .slice(0)
                .reverse()
                .map((val, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        val.issue === "Fire"
                          ? "bg-danger m-3 p-3 text-light border border-dark rounded"
                          : val.issue === "Police"
                          ? "bg-primary m-3 p-3 text-light border border-dark rounded"
                          : "bg-light m-3 p-3 text-dark border border-dark rounded"
                      }
                    >
                      {val.issue === "Fire" ? (
                        <WhatshotIcon />
                      ) : val.issue === "Police" ? (
                        <PersonOutlineIcon />
                      ) : (
                        <LocalHospitalIcon />
                      )}
                      &nbsp;&nbsp;
                      <span>
                        {val.issue} ALERT from {val.patientName}
                      </span>
                      <br />
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home
