import React from 'react'
import socketIOClient from "socket.io-client";
import Card from "react-bootstrap/Card";

export default function EmergencyAlert() {
  const socket = socketIOClient("http://localhost:5001");
  const patientName = localStorage.getItem("loggedInName");
  const fire = () => {
    // alert('fire');
    socket.emit('fire', {patientName, issue: "Fire"});
  };
  const medical = () => {
    // alert("medical");
    socket.emit("medical", { patientName, issue: "Medical" });
  };
  const police = () => {
    // alert("police");
    socket.emit("police", { patientName, issue: "Police" });
  };
 
    return (
      <div className="d-flex flex-row justify-content-around align-items-center flex-wrap h-100">
        <Card style={{ width: "18rem" }} onClick={fire}>
          <Card.Img
            variant="top"
            src="https://media.gettyimages.com/vectors/fire-truck-vector-id509101682?s=612x612"
            height="200px"
            width="200px"
          />
          <Card.Body className="d-flex justify-content-around">
            <Card.Title>Fire</Card.Title>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }} onClick={police}>
          <Card.Img
            variant="top"
            src="https://cdn4.iconfinder.com/data/icons/transport-flat-4/614/338_-_Police_Car-512.png"
            height="200px"
            width="200px"
          />
          <Card.Body className="d-flex justify-content-around">
            <Card.Title>Police</Card.Title>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }} onClick={medical}>
          <Card.Img
            src="https://www.pngitem.com/pimgs/m/146-1466285_ambulance-hospital-icon-ambulance-icon-png-transparent-png.png"
            variant="top"
            height="200px"
            width="200px"
          />
          <Card.Body className="d-flex justify-content-around">
            <Card.Title>Medical</Card.Title>
          </Card.Body>
        </Card>
      </div>
    );
}
