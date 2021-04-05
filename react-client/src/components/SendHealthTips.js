import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { withRouter } from "react-router";
import Toast from "react-bootstrap/Toast";
import { useHistory } from "react-router-dom";


export default function SendHealthTips() {
  const [patientList, setPatientList] = useState([
    { _id: "", firstName: "", lastName: "" },
  ]);
   const [show, setShow] = useState(false);
   const [toastMessage, setToastMessage] = useState(null);
   const [tips, setTips] = useState({
     id: "",
     title: "",
     message: "",
     resourceLink: "",
   });
  const sendHealthTips = (e) => {
    // Using absolute URL because it will be absolute in production
    const apiUrl = "http://localhost:5000/saveTips";
    const data = {
      id: tips.id,
      title: tips.title,
      message: tips.message,
      resourceLink: tips.resourceLink,
    };
    e.preventDefault();
    console.log("Tips sent", data);
    axios
      .post(apiUrl, data)
      .then((result) => {
        console.log("created_tips", result);
        setToastMessage("Vital created!");
        setShow(true);
        window.location.pathname = "/";
      })
      .catch((error) => {
        console.log("error_happened", error);
        setToastMessage("Something went wrong!");
        setShow(true);
      });
  };
  const onChange = (e) => {
      e.persist();
      setTips({ ...tips, [e.target.name]: e.target.value });
      // console.log('tips', tips);
  };
  const getPatientList = () => {
    const apiUrl = "http://localhost:5000/getPatientList";
    axios
      .get(apiUrl)
      .then((result) => {
        setPatientList(result.data);
        console.log("PatientList", result);
      })
      .catch((error) => {
        console.log("error_happened", error);
      });
  };

  useEffect(() => {
      getPatientList();
  }, []); //only the first render
  return (
    <div className="d-flex justify-content-around align-items-center h-100 p-5 blank-space-filler">
      <div className="w-50 border rounded p-5 form-background">
        <h1 className="topic-color d-flex justify-content-around rounded">
          Send Health Tips
        </h1>

        <Form onSubmit={sendHealthTips} id="signup-form">
          <div className="row">
            <Form.Group className="col-md-12">
              <Form.Label className="topic-color">Patient Name</Form.Label>
              <Form.Control as="select" name="id" id="id" onChange={onChange}>
                <option></option>
                {patientList.map((val, key) => {
                  return (
                    <option key={key} value={val._id}>
                      {val.firstName} {val.lastName}
                    </option>
                  );
                })}
                ;
              </Form.Control>
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="col-md-12">
              <Form.Label className="topic-color">Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                id="title"
                placeholder="title"
                onChange={onChange}
              />
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="col-md-12">
              <Form.Label className="topic-color">Resource Link</Form.Label>
              <Form.Control
                type="text"
                name="resourceLink"
                id="resourceLink"
                placeholder="resourceLink"
                onChange={onChange}
              />
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="col-md-12">
              <Form.Label className="topic-color">Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="message"
                id="message"
                placeholder="message"
                onChange={onChange}
              />
            </Form.Group>
          </div>
          <Button variant="danger" type="submit" className="col-md-12">
            Send
          </Button>
          <div className="row">
            <div className="col-md-12">
              <Toast
                onClose={() => setShow(false)}
                show={show}
                delay={3000}
                autohide
              >
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                  />
                  <strong className="mr-auto">{toastMessage}</strong>
                </Toast.Header>
              </Toast>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
