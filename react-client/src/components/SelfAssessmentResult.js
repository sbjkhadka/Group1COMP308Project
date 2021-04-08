import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import WarningIcon from "@material-ui/icons/Warning";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function AssessmentResult({ symptoms }) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [fetchState, setFetchState] = useState(false);

  //runs once after the first rendering of page
  useEffect(() => {
    const apiUrl = "http://localhost:5000/predictHepatitis";

    const fetchData = async () => {
      axios
        .post(apiUrl, symptoms)
        .then((result) => {
          console.log("prediction result", result.data);
          setFetchState(true);
          setData(result.data);
          setShowLoading(false);
        })
        .catch((error) => {
          console.log("error in fetchData:", error);
          setFetchState(false);
          setShowLoading(false);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="w-100 h-auto d-flex justify-content-around flex-column align-items-center">
      <h1 className="mt-5">Hepatitis Prediction Result</h1>
      {showLoading ? (
        <>
          <CircularProgress className="mt-5" />
          <span className="mt-3">Please wait as this may take a few minutes...</span>
        </>
      ) : fetchState ? (
        <>
          <Table
            striped
            bordered
            hover
            size="sm"
            className="w-75 mt-3 text-center mb-10"
          >
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
          {data[0] > data[1] && <AppointmentPreparation />}
          {data[0] < data[1] && <HepatitisTips />}
        </>
      ) :
        <ErrorMessage />
      }
    </div>
  );
}

function HepatitisTips() {
  return (
    <div className="mt-5 w-100 h-auto d-flex justify-content-around flex-column align-items-center">
      <Alert variant="success">
        <Alert.Heading>
          Lifestyle and self-care tips for hepatitis
        </Alert.Heading>
        <p>
          Strategies to help you recover, improve your prognosis, and protect
          those around you include:
        </p>
        <ul>
          <li>Abstaining from alcohol and other toxic substances</li>
          <li>Eating a well-balanced diet low in fat</li>
          <li>
            Monitoring your liver function as recommended by your physician,
            which may include blood tests and liver ultrasound or other imaging
          </li>
          <li>
            Protecting your household members and sexual partners from infection
            if you have viral hepatitis
          </li>
          <li>Rest (you may too tired to work or go to school)</li>
          <li>
            Taking medications only as necessary and prescribed by your
            physician
          </li>
        </ul>
      </Alert>
    </div>
  );
}

function AppointmentPreparation() {
  return (
    <div className="mt-5 w-100 h-auto d-flex justify-content-around flex-column align-items-center">
      <Alert variant="danger">
        <Alert.Heading>
          Make an appointment with your family doctor ASAP
        </Alert.Heading>
        <p>Well-prepared for your appointment:</p>
        <ul>
          <li>
            <b>Be aware of pre-appointment restrictions.</b> When you make the
            appointment, find out if there's anything you need to do in advance,
            such as change your diet.
          </li>
          <li>
            <b>Write down your symptoms.</b> Include those that seem unrelated
            to the reason for your appointment.
          </li>
          <li>
            <b>Write down key personal information</b>, including major stresses
            or recent life changes.
          </li>
          <li>
            <b>List medications</b>, vitamins and supplements you take.
          </li>
          <li>
            <b>Consider taking a family member or friend along.</b> Someone who
            accompanies you may remember something that you missed or
            forgot.Rest (you may too tired to work or go to school)
          </li>
          <li>
            <b>Write down questions</b> to ask your doctor.
          </li>
        </ul>
      </Alert>
    </div>
  );
}

function ErrorMessage() {
  return (
    <div className="w-100 h-auto d-flex justify-content-around flex-column align-items-center">
      <WarningIcon style={{ fontSize: 200 }} />
      <h5>Oops! Something went wrong.</h5>
      <h6>
        Please <a href="/assessment">try again</a>.
      </h6>
    </div>
  );
}
