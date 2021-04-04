const User = require("mongoose").model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config.js");
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;
// Create a new user
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

exports.authenticate = function (req, res, next) {
  // Get credentials from request
  console.log("body", req.body);
  const email = req.body.email;
  const password = req.body.password;
  console.log(password);
  console.log(email);
  //find the user with given username using static method findOne
  User.findOne({ email: email }, (err, user) => {
    if (err) {
        console.log('error_happened');
      return next(err);
    } else {
      console.log('user_pwd',user.password);
      console.log("_pwd", password);
      //compare passwords
      if (user && bcrypt.compareSync(password, user.password)) {
        // Create a new token with the user id in the payload
        // and which expires 300 seconds after issue
        const token = jwt.sign(
          { id: user._id, email: user.email },
          jwtKey,
          { algorithm: "HS256", expiresIn: jwtExpirySeconds }
        );
        console.log("token:", token);
        // set the cookie as the token string, with a similar max age as the token
        // here, the max age is in milliseconds

        res.status(200).send({
          screen: user.userType,
          token: token,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email, 
          street: user.street, 
          city: user.city,
          phone: user.phone, 
          province: user.province,
          userType: user.userType
        });

        req.user = user;
        //call the next middleware
        next();
      } else {
        res.json({
          status: "error",
          message: "Invalid username/password!!!",
          data: null,
        });
      }
    }
  });
};