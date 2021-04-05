const User = require("mongoose").model("User");
const Vital = require("mongoose").model("Vital");
const Tips = require("mongoose").model("Tips");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config.js");
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;


exports.createVitals = (req, res) => {
  console.log("recCon", req.body._id);
  const vital = new Vital();
  vital.temperature = req.body.temperature;
  vital.heartRate = req.body.heartRate;
  vital.systolic = req.body.systolic;
  vital.distolic = req.body.distolic;
  vital.respiratoryRate = req.body.respiratoryRate;
  vital.patient = req.body._id;

    vital.save((err) => {
      if (err) {
        // console.log("error", getErrorMessage(err));

        return res.status(400).send({
          message: err,
        });
      } else {
        res.status(200).json(vital);
      }
    });
};

exports.myVitals = (req, res) => {
  console.log('vitalsMy', req.body);
  Vital.find({patient: req.body.id}, (err, vitals) => {
      if (err) {
        console.log("error happened", err);
      } else {
        console.log("vitals_found", vitals);
        res.status(200).json(vitals);
      }
  });
};

exports.saveTips = (req, res) => {
  console.log('tips_received', req.body);
    const tips = new Tips();
    tips.title = req.body.title;
    tips.message = req.body.message;
    tips.resourceLink = req.body.resourceLink;
    tips.patient = req.body.id;

    tips.save((err) => {
      if (err) {
        // console.log("error", getErrorMessage(err));

        return res.status(400).send({
          message: err,
        });
      } else {
        res.status(200).json(tips);
      }
    });
};

exports.myTips = (req, res) => {
  console.log("tipsMy", req.body);
  Tips.find({ patient: req.body.patientId }, (err, tips) => {
    if (err) {
      console.log("error happened", err);
    } else {
      console.log("vitals_found", tips);
      res.status(200).json(tips);
    }
  });
};
