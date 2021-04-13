// var students = require("../controllers/students.server.controller.js");
var express = require("express");
var router = express.Router();
var users = require("../controllers/users.server.controller.js");
var records = require("../controllers/records.server.controller.js");

module.exports = function (app) {
  app.post("/create", users.create);
  app.post("/login", users.authenticate);
  app.post("/checkIdAnyUserIsAlreadySignedIn", users.isSignedIn);
  app.get("/getPatientList", users.getPatientList);
  app.post("/createVitals", records.createVitals);
  app.post("/myVitals", records.myVitals);
  app.post("/saveTips", records.saveTips);
  app.post("/readTips", records.myTips);
  app.post("/predictHepatitis", users.trainAndPredictHepatitis);
};
