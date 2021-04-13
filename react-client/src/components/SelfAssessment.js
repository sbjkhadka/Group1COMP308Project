import React, { useState } from "react";
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SelfAssessmentResult from "./SelfAssessmentResult";

export default function SelfAssessment() {
  let { url } = useRouteMatch();
  const [symptoms, setSymptoms] = useState({
    age: null,
    sex: "M",
    steroid: false,
    antivirals: false,
    fatigue: false,
    malaise: false,
    anorexia: false,
    liverBig: false,
    liverFirm: false,
    spleenPalpable: false,
    spiders: false,
    ascites: false,
    varices: false,
    bilirubin: null,
    alkPhosphate: null,
    sgot: null,
    albumin: null,
    protime: null,
    histology: false,
  });

  return (
    <Switch>
      <Route render={() => <AssessmentForm useSymptoms={()=>[symptoms, setSymptoms]}/>} exact path={`${url}`} />
      <Route render={() => <SelfAssessmentResult symptoms={symptoms}/>} path={`${url}/result`} />
    </Switch>
  );
}

function AssessmentForm({ useSymptoms }) {
  const [symptoms, setSymptoms] = useSymptoms();
  let { url } = useRouteMatch();
  const history = useHistory();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    history.push({
      pathname: `${url}/result`,
    });
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setSymptoms({ ...symptoms, [name]: value });
  };

  return (
    <div className="d-flex justify-content-around align-items-center h-100 p-5 blank-space-filler">
      <div className="w-50 border rounded p-5 form-background">
        <h1 className="topic-color d-flex justify-content-around rounded">
          Hepatitis Prediction
        </h1>

        <Form onSubmit={handleOnSubmit} id="assessment-form">
          <div className="row">
            <Form.Group className="col-md-6">
              <Form.Label className="topic-color">Age</Form.Label>
              <Form.Control
                type="number"
                min="1"
                step="1"
                name="age"
                id="age"
                placeholder="Age"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="col-md-6">
              <Form.Label className="topic-color">Sex</Form.Label>
              <Form.Control
                as="select"
                name="sex"
                id="sex"
                onChange={handleInputChange}
                required
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Form.Control>
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="col-md-3">
              <Form.Check
                className="topic-color"
                type="checkbox"
                label="Steroid"
                id="steroid"
                name="steroid"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="col-md-3">
              <Form.Check
                className="topic-color"
                type="checkbox"
                label="Antivirals"
                id="antivirals"
                name="antivirals"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="col-md-3">
              <Form.Check
                className="topic-color"
                type="checkbox"
                label="Fatigue"
                id="fatigue"
                name="fatigue"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="col-md-3">
              <Form.Check
                className="topic-color"
                type="checkbox"
                label="Malaise"
                id="malaise"
                name="malaise"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="col-md-3">
              <Form.Check
                className="topic-color"
                type="checkbox"
                label="Anorexia"
                id="anorexia"
                name="anorexia"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="col-md-3">
              <Form.Check
                className="topic-color"
                type="checkbox"
                label="Liver Big"
                id="liverBig"
                name="liverBig"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="col-md-3">
              <Form.Check
                className="topic-color"
                type="checkbox"
                label="Liver Firm"
                id="liverFirm"
                name="liverFirm"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="col-md-3">
              <Form.Check
                className="topic-color"
                type="checkbox"
                label="Spiders"
                id="spiders"
                name="spiders"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="col-md-3">
              <Form.Check
                className="topic-color"
                type="checkbox"
                label="Ascites"
                id="ascites"
                name="ascites"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="col-md-3">
              <Form.Check
                className="topic-color"
                type="checkbox"
                label="Varices"
                id="varices"
                name="varices"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="col-md-3">
              <Form.Check
                className="topic-color"
                type="checkbox"
                label="Histology"
                id="histology"
                name="histology"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="col-md-3">
              <Form.Check
                className="topic-color"
                type="checkbox"
                label="Spleen Palpable"
                id="spleenPalpable"
                name="spleenPalpable"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          <div className="row">
            <Form.Group className="col-md-4">
              <Form.Label className="topic-color">Bilirubin</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                name="bilirubin"
                id="bilirubin"
                placeholder="Bilirubin"
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="col-md-4">
              <Form.Label className="topic-color">Sgot</Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="sgot"
                id="sgot"
                placeholder="Sgot"
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="col-md-4">
              <Form.Label className="topic-color">Protime</Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="protime"
                id="protime"
                placeholder="Protime"
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="col-md-6">
              <Form.Label className="topic-color">Alk Phosphate</Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="alkPhosphate"
                id="alkPhosphate"
                placeholder="Alk Phosphate"
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="col-md-6">
              <Form.Label className="topic-color">Albumin</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="albumin"
                id="albumin"
                placeholder="Albumin"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </div>

          <Button variant="danger" type="submit" className="col-md-12">
            Predict
          </Button>
        </Form>
      </div>
    </div>
  );
}
