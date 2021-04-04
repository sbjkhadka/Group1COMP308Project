import React, {useState} from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import axios from "axios";

function Home() {
    const [credential, setcredential] = useState({
      email: "",
      password: ""
    });

       const onChange = (e) => {
         e.persist();
         setcredential({ ...credential, [e.target.name]: e.target.value });
       };

          const authenticateUser = (e) => {
            e.persist();

            console.log("current_credentials", credential);
            // Using absolute URL because it will be absolute in production
            const apiUrl = "http://localhost:5000/login";
            const data = {
              email: credential.email,
              password: credential.password,
            };
            e.preventDefault();
            console.log("user sent", data);
            axios
              .post(apiUrl, data)
              .then((result) => {
                console.log("logged_in_successfully", result);
                // setToastMessage("User created!");
                // setShow(true);
                // props.history.push("/");
              })
              .catch((error) => {
                console.log("error_happened", error);
                // setToastMessage("Something went wrong!");
                // setShow(true);
                // setShowLoading(false);
              });
          };
    return (
      <div className="d-flex justify-content-around align-items-center h-100 p-5 blank-space-filler">
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
      </div>
    );
}

export default Home
