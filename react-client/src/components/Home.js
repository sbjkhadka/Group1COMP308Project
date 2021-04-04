import React, {useState} from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Home() {

       const onChange = (e) => {
        //  e.persist();
        //  setUser({ ...user, [e.target.name]: e.target.value });
       };

          const authenticateUser = (e) => {
            // e.persist();
            // setUser({ ...user, [e.target.name]: e.target.value });
          };
    return (
      <div className="d-flex justify-content-around align-items-center h-100 p-5 blank-space-filler">
        <div className="w-25 border rounded p-5 form-background">
          <h1 className="topic-color d-flex justify-content-around rounded">
            Login
          </h1>

          <Form onSubmit={authenticateUser} id="signup-form">
            <div className="row">
              <Form.Group className="col-md-12">
                <Form.Label className="topic-color">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  onChange={onChange}
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
