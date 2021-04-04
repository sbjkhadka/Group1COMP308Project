const User = require("mongoose").model("User");
// Create a new student
exports.create = function (req, res, next) {
  var user = new User(req.body);
  console.log("body: " + req.body.firstName);

  user.save(function (err) {
    if (err) {
      return next(err);
    } else {
      res.json(user);
    }
  });
};