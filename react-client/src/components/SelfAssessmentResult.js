import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

export default function AssessmentResult({ symptoms }) {
  const [data, setData] = useState([]);
  console.log(symptoms);

  //runs once after the first rendering of page
  useEffect(() => {
    const apiUrl = "http://localhost:3000/predictHepatitis";

    const fetchData = async () => {
      axios
        .post(apiUrl, symptoms)
        .then((result) => {
          console.log("prediction result", result.data);
          setData(result.data);
        })
        .catch((error) => {
          console.log("error in fetchData:", error);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="w-100 h-auto d-flex justify-content-around flex-column align-items-center">
      <h1 className="mt-5">Hepatitis Prediction Result</h1>
      <Table striped bordered hover size="sm" className="w-75 mt-3 text-center">
        <thead>
          <tr>
            <th>Die %</th>
            <th>Live %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data[0]}</td>
            <td>{data[1]}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
