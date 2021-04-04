import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { withRouter } from "react-router";
import Toast from "react-bootstrap/Toast";
import { useHistory } from "react-router-dom";
function Signup(props) {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [user, setUser] = useState({
        _id: "",
        firstName: "",
        lastName: "",
        street: "", 
        city: "", 
        email: "", 
        phone: "", 
        province: "on", 
        password: "", 
        userType: "nurse"

    });
     const onChange = (e) => {
        e.persist();
        setUser({ ...user, [e.target.name]: e.target.value });
     };

    const saveUser = (e) => {
        // Using absolute URL because it will be absolute in production
        const apiUrl = "http://localhost:5000/create";
        const data = {
          firstName: user.firstName,
          lastName: user.lastName,
          street: user.street,
          city: user.city,
          email: user.email,
          phone: user.phone,
          province: user.province,
          password: user.password,
          userType: user.userType,
        };
        e.preventDefault();
        console.log("user sent", data);
           axios
             .post(apiUrl, data)
             .then((result) => {
                 console.log('created_user', result);
                 setToastMessage("User created!");
                 setShow(true);
                 window.location.pathname = "/";
             })
             .catch((error) => {
                 console.log('error_happened', error);
                 setToastMessage("Something went wrong!");
                 setShow(true);
             });
    };
    return (
      <div className="d-flex justify-content-around align-items-center h-100 p-5 blank-space-filler">
        <div className="w-50 border rounded p-5 form-background">
          <h1 className="topic-color d-flex justify-content-around rounded">
            Register User
          </h1>

          <Form onSubmit={saveUser} id="signup-form">
            <div className="row">
              <Form.Group className="col-md-6">
                <Form.Label className="topic-color">First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group className="col-md-6">
                <Form.Label className="topic-color">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  onChange={onChange}
                />
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group className="col-md-8">
                <Form.Label className="topic-color">Street Name</Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  id="street"
                  placeholder="street"
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group className="col-md-4">
                <Form.Label className="topic-color">City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  id="city"
                  placeholder="city"
                  onChange={onChange}
                />
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group className="col-md-5">
                <Form.Label className="topic-color">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group className="col-md-5">
                <Form.Label className="topic-color">Phone</Form.Label>
                <Form.Control
                  type="phone"
                  name="phone"
                  id="phone"
                  placeholder="phone"
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group className="col-md-2">
                <Form.Label className="topic-color">Province</Form.Label>
                <Form.Control
                  as="select"
                  name="province"
                  id="province"
                  onChange={onChange}
                >
                  <option value="on">ON</option>
                  <option value="qc">QC</option>
                </Form.Control>
              </Form.Group>
            </div>

            <div className="row">
              <Form.Group className="col-md-6">
                <Form.Label className="topic-color">Password</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={onChange}
                />
              </Form.Group>

              <Form.Group className="col-md-6">
                <Form.Label className="topic-color">User Type</Form.Label>
                <Form.Control
                  as="select"
                  name="userType"
                  id="userType"
                  onChange={onChange}
                >
                  <option value="nurse">Nurse</option>
                  <option value="patient">Patient</option>
                </Form.Control>
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

export default withRouter(Signup);
