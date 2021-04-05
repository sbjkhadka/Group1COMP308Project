import React, { useState, useEffect } from "react";

import axios from "axios";
import Table from "react-bootstrap/Table";

export default function MyVitals(props) {
    const [vitalList, setVitalList] = useState([]);
    const getMyVitals = () => {
        let searchId = localStorage.getItem("loggedInId");
        if(localStorage.getItem("screen") === "nurse") {
            searchId = props.id;
        }
        const apiUrl = "http://localhost:5000/myVitals";
        const data = {
          id: searchId,
        };

console.log("user sent", data);
axios
  .post(apiUrl, data)
  .then((res) => {
    console.log("vitals received", res);
    setVitalList(res.data);
  })
  .catch((error) => {
    console.log("error_happened", error);
  });
    };
  useEffect(() => {
    getMyVitals();
  }, [props.id]); //only the first render

  return (
    <div className="w-100 h-auto d-flex justify-content-around flex-column align-items-center">
        <h1 className="mt-5">Vital Record</h1>
      <Table striped bordered hover size="sm" className="w-75 mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>
              Temperature <sup>o</sup>C
            </th>
            <th>Heart Rate (bpm)</th>
            <th>Blood Pressure</th>
            <th>Respiration (bpm)</th>
          </tr>
        </thead>
        <tbody>
            {vitalList.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{new Date(val.created).toLocaleDateString()}</td>
                    <td>{val.temperature}</td>
                    <td>{val.heartRate}</td>
                    <td>
                      {val.systolic}/ {val.distolic}
                    </td>
                    <td>{val.respiratoryRate}</td>
                  </tr>
                );
  
            })}
        
        </tbody>
      </Table>
    </div>
  );
}
