import React, { useState, useEffect } from "react";
import MyVitals from "../components/MyVitals";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function ViewPatientVital() {
  const [patientList, setPatientList] = useState([
    { _id: "", firstName: "", lastName: "" },
  ]);
  const [selectedId, setSelectedId] = useState(null);

   const onChange = (e) => {
     e.persist();
     console.log('e',e.target.value);
     setSelectedId(e.target.value);
     // setVital({ ...vital, [e.target.name]: e.target.value });
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
    <div className="d-flex justify-content-around align-items-center flex-column">
      <Form className="w-50 border rounded p-3 mt-5 form-background">
        <div className="row">
          <Form.Group className="col-md-12">
            <Form.Label className="topic-color">Select Patient</Form.Label>
            <Form.Control as="select" name="id" id="id" onChange={onChange}>
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
      </Form>
      <MyVitals id={selectedId} />
    </div>
  );
}
