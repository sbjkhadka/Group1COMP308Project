import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Jumbotron, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function EmergencyAlertView(props) {
    // patient list
    const [dataPatients, setPatientData] = useState([]);
    const apiUrlPatient = "http://localhost:3000/patients";
    // alert
    const [data, setData] = useState({
        _id: "",
        owner: "",
        message: "",
        created: null,
        unread: true,
    });
    const apiUrl = "http://localhost:3000/api/alert/" + props.match.params.id;
    // loading
    const [showLoading, setShowLoading] = useState(true);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        setShowLoading(false);
        const fetchData = async () => {
            // call alert api
            const result = await axios(apiUrl);
            setData(result.data);
            // call patient api
            const resultPatient = await axios(apiUrlPatient);
            setPatientData(resultPatient.data);
            // loading ends
            setShowLoading(false);
        };
        fetchData();
    }, []);

    const displayPatientName = dataPatients
        .filter(item => item._id === data.owner)
        .map(item => {
            return item.firstName[0].toUpperCase() + item.firstName.slice(1)
                + " "
                + item.lastName[0].toUpperCase() + item.lastName.slice(1);
        })

    return (

        <div className="container-fluid  d-flex justify-content-center">
            <div className="col-6 div-style p-10">
                <div className="bg-danger text-light title">
                    <h2 className="h2-style">Emegency Alert</h2>
                </div>
                <br />

                {showLoading && (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )}

                <div className="container-fluid margins">
                    {showError && (
                        <span>
                            There is something wrong...
                        </span>
                    )}

                    <Jumbotron className="bg-light">
                        <Form>
                            <Form.Group>
                                <Form.Label className="font-weight-bold">
                                    Patient Name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    rows="10"
                                    name="patientName"
                                    id="patientName"
                                    value={displayPatientName}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="font-weight-bold">
                                    Date
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    rows="10"
                                    name="created"
                                    id="created"
                                    value={String(data.created).replace('T', ' ').slice(0, 19)}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="font-weight-bold">
                                    Message
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="10"
                                    name="message"
                                    id="message"
                                    className="textarea"
                                    value={data.message}
                                    readOnly
                                />
                            </Form.Group>

                            <div className="text-center">
                                <a className="btn btn-outline-danger col-6" href="/emergencyAlertHistory">View Alert List</a>
                            </div>

                        </Form>
                    </Jumbotron>

                </div>
            </div>
        </div>
    );

}

export default withRouter(EmergencyAlertView);
