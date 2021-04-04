// var students = require("../controllers/students.server.controller.js");
var express = require("express");
var router = express.Router();
var users = require("../controllers/users.server.controller.js");

module.exports = function (app) {
 

  app.post("/create", users.create);
  app.post("/login", users.authenticate);
};
