const Alert = require("mongoose").model("Alert");

const getErrorMessage = function (err) {
  var message = "";
  if (err.code) {
    switch (err.code) {
      default:
        message = "something went wrong";
    }
  } else {
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

exports.create = function (req, res) {
  const alert = new Alert(req.body);

  alert.owner = req.user._id;
  alert.unread = true;
  alert.created = new Date();

  alert.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err),
      });
    } else {
      res.status(200).json(alert);
    }
  });
};

exports.list = function (req, res) {
  Alert.find()
    .sort({ created: -1 })
    .sort("-owner")
    .exec((err, alerts) => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err),
        });
      } else {
        return res.status(200).json(alerts);
      }
    });
};

exports.infoByID = function (req, res, next, id) {
  Alert.findById(id).exec((err, alert) => {
    if (err) return next(err);
    if (!alert) return next(new Error("Failed to load alert " + id));
    req.alert = alert;
    req.alertId = alert._id;
    next();
  });
};

exports.hasAuthorization = function (req, res, next) {
  if (!req.alert.owner === req.user._id) {
    return res.status(403).send({
      message: "User is not authorized",
    });
  }
  next();
};

exports.read = function (req, res) {
  // update read item
  Alert.findByIdAndUpdate({ _id: req.alertId }, { unread: false }, function (
    err,
    alert
  ) {
    if (err) return next(err);
    res.json(alert);
  });
};


exports.update = function (req, res) {
  Alert.findByIdAndUpdate({ _id: req.alertId }, req.body, function (
    err,
    alert
  ) {
    if (err) return next(err);
    res.json(alert);
  });
};

exports.delete = function (req, res) {
  Alert.findOneAndRemove({ _id: req.alertId }, req.body, function (err, alert) {
    if (err) return next(err);
    res.json(alert);
  });
};
