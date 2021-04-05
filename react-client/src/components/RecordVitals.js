import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { withRouter } from "react-router";
import Toast from "react-bootstrap/Toast";
import { useHistory } from "react-router-dom";

export default function RecordVitals() {
  const [isPatient, setIsPatient] = useState(true);
  const [patientList, setPatientList] = useState([{_id:"", firstName: "", lastName:""}]);
  const [show, setShow] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [vital, setVital] = useState({
    _id: "",
    temperature: "",
    heartRate: "",
    systolic: "",
    distolic: "",
    respiratoryRate: "",
  });
  const onChange = (e) => {
    e.persist();
    setVital({ ...vital, [e.target.name]: e.target.value });
  };

  const saveVital = (e) => {
    // Using absolute URL because it will be absolute in production
    const apiUrl = "http://localhost:5000/createVitals";
    const data = {
      _id: vital.id,
      temperature: vital.temperature,
      heartRate: vital.heartRate,
      systolic: vital.systolic,
      distolic: vital.distolic,
      respiratoryRate: vital.respiratoryRate,
    };
    e.preventDefault();
    console.log("Vital sent", data);
    axios
      .post(apiUrl, data)
      .then((result) => {
        console.log("created_vital", result);
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
    if(localStorage.getItem("screen") === "nurse") {
      getPatientList();
      setIsPatient(false);
    } else if (localStorage.getItem("screen") === "patient") {
      setIsPatient(true);
      setVital({ ...vital, id: localStorage.getItem("loggedInId") });
    }
    
  }, []); //only the first render
  return (
    <div className="d-flex justify-content-around align-items-center h-100 p-5 blank-space-filler">
      <div className="w-50 border rounded p-5 form-background">
        <h1 className="topic-color d-flex justify-content-around rounded">
          Vitals Entry
        </h1>

        <Form onSubmit={saveVital} id="signup-form">
          {isPatient === false ? (
            <div>
              <div className="row">
                <Form.Group className="col-md-12">
                  <Form.Label className="topic-color">Patient Name</Form.Label>
                  <Form.Control
                    as="select"
                    name="id"
                    id="id"
                    onChange={onChange}
                  >
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
            </div>
          ) : (
            <div></div>
          )}

          <div className="row">
            <Form.Group className="col-md-12">
              <Form.Label className="topic-color">
                Temperature (<sup>o</sup>C)
              </Form.Label>
              <Form.Control
                type="number"
                name="temperature"
                id="temperature"
                placeholder="Temperature"
                onChange={onChange}
              />
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="col-md-12">
              <Form.Label className="topic-color">
                Heart Rate (Beats Per Minute)
              </Form.Label>
              <Form.Control
                type="number"
                name="heartRate"
                id="heartRate"
                placeholder="Heart Rate"
                onChange={onChange}
              />
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="col-md-6">
              <Form.Label className="topic-color">
                Systolic Pressure (mmHg)
              </Form.Label>
              <Form.Control
                type="number"
                name="systolic"
                id="systolic"
                placeholder="systolic"
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="col-md-6">
              <Form.Label className="topic-color">
                Distolic Pressure (mmHg)
              </Form.Label>
              <Form.Control
                type="number"
                name="distolic"
                id="distolic"
                placeholder="distolic"
                onChange={onChange}
              />
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="col-md-12">
              <Form.Label className="topic-color">
                Respiratory Rate (Breath Per minute)
              </Form.Label>
              <Form.Control
                type="number"
                name="respiratoryRate"
                id="respiratoryRate"
                placeholder="Respiratory Rate"
                onChange={onChange}
              />
            </Form.Group>
          </div>

          <Button variant="danger" type="submit" className="col-md-12">
            Save
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
