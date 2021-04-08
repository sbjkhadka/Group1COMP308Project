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
          userType: user.userType,
          id: user._id
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

exports.isSignedIn = (req, res) => {
  const token = req.body.authKey;
  console.log("token_received", token);
  // if the cookie is not set, return 'auth'
  if (!token) {
    // console.log('no_token')
    return res.send({ screen: "auth" }).end();
  }
  var payload;
  try {
    payload = jwt.verify(token, jwtKey);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // the JWT is unauthorized, return a 401 error
      return res.status(401).end();
    }
    // otherwise, return a bad request error
    return res.status(400).end();
  }

  // Finally, token is ok, return the username given in the token
  res.status(200).send({ screen: payload.email }); // need to modify this
};

exports.getPatientList = (req, res) => {
  console.log('getting patient list');
  User.find({userType:"patient"}, (err, users) => {
    if (err) {
        console.log('error_happened');
      return next(err);
    } else {
      res.status(200).send(users);
    }
  });
};

exports.createVitals = (req, res) => {
  console.log('recCon', req.body);
};

// AI functionality
exports.trainAndPredictHepatitis = function (req, res) {
  const testingData = prepareTestingDataFromRequest(req.body);
  console.log("Prepare testingData: ", testingData);

  const tf = require('@tensorflow/tfjs');
  require('@tensorflow/tfjs-node');
  // load training data
  const hep = require('../../hep_train.json');
  // const hepTesting = require('../../hep_test.json');

  // tensor of features for training data
  console.log('trainingData');
  const trainingData = tf.tensor2d(hep.map(item => [
      item.Age,
      item.Sex,
      item.Steroid,
      item.Antivirals,
      item.Fatigue,
      item.Malaise,
      item.Anorexia,
      item.Liver_big,
      item.Liver_firm,
      item.Spleen_palpable,
      item.Spiders,
      item.Ascites,
      item.Varices,
      item.Bilurubin,
      item.Alk_phosphate,
      item.Sgot,
      item.Albumin,
      item.Protime,
      item.Histology
  ]))
  //
  //tensor of output for training data
  //console.log(trainingData.dataSync())
  //
  //tensor of output for training data
  //the values for species will be:
  // Die_Live 1:       1,0
  // Die_Live 2:       0,1
  const outputData = tf.tensor2d(hep.map(item => [
      item.Die_Live === 1 ? 1 : 0,
      item.Die_Live === 2 ? 1 : 0
  ]))
  //console.log(outputData.dataSync())

  //
  //tensor of features for testing data
  const testingData2d = tf.tensor2d([testingData]);
  // const testingData = tf.tensor2d(hepTesting.map(item => [
  //     item.Age,
  //     item.Sex,
  //     item.Steroid,
  //     item.Antivirals,
  //     item.Fatigue,
  //     item.Malaise,
  //     item.Anorexia,
  //     item.Liver_big,
  //     item.Liver_firm,
  //     item.Spleen_palpable,
  //     item.Spiders,
  //     item.Ascites,
  //     item.Varices,
  //     item.Bilurubin,
  //     item.Alk_phosphate,
  //     item.Sgot,
  //     item.Albumin,
  //     item.Protime,
  //     item.Histology
  // ]))
  // console.log(testingData.dataSync())
  // testingData.array().then(array => {
  //     console.log(array)
  // })

  // build neural network using a sequential model
  const model = tf.sequential()
  //add the first layer
  model.add(tf.layers.dense({
      inputShape: [19], // 19 input neurons (features)
      activation: "sigmoid",
      units: 30, //dimension of output space (first hidden layer)
  }))
  //add the first hidden layer
  model.add(tf.layers.dense({
      inputShape: [30], //dimension of hidden layer (2/3 rule)
      activation: "sigmoid",
      units: 15, //dimension of final output (die or live)
  }))
  //add the first hidden layer
  model.add(tf.layers.dense({
      inputShape: [15], //dimension of hidden layer (2/3 rule)
      activation: "sigmoid",
      units: 2, //dimension of final output (die or live)
  }))
  //add output layer
  model.add(tf.layers.dense({
      activation: "sigmoid",
      units: 2, //dimension of final output
  }))
  //compile the model with an MSE loss function and Adam algorithm
  model.compile({
      //categoricalCrossentropy
      loss: "meanSquaredError",
      optimizer: tf.train.adam(.003),
      metrics: ['accuracy'],
  })
  console.log(model.summary())
  // train/fit the model for the fixed number of epochs
  const startTime = Date.now()
  //
  async function run() {
      const startTime = Date.now()
      await model.fit(trainingData, outputData,
          {
              epochs: 500,
              callbacks: {
                  onEpochEnd: async (epoch, log) => {
                      console.log(`Epoch ${epoch}: loss = ${log.loss}`);
                      elapsedTime = Date.now() - startTime;
                      console.log('elapsed time: ' + elapsedTime)
                  }
              }
          }

      ) //fit
      //
      const results = model.predict(testingData2d);
      results.print()
      // get the values from the tf.Tensor
      //var tensorData = results.dataSync();
      results.array().then(array => {
        console.log("result", array[0]);
        res.status(200).send(array[0]);
      })
  } //end of run function
  run()
  //

};

// Convert the payload to the ML model data
const prepareTestingDataFromRequest = (data) => {
  const { age, sex, steroid, antivirals, fatigue, malaise, anorexia, liverBig, liverFirm, spleenPalpable, 
    spiders, ascites, varices, bilirubin, alkPhosphate, sgot, albumin, protime, histology } = data;

  // Map sex - 1: Male(M) 2: Female(F)
  // Map checkboxes - 1: False 2: True 
  return [
    parseInt(age),
    sex === "F" ? 2 : 1,
    steroid ? 2 : 1,
    antivirals ? 2 : 1,
    fatigue ? 2 : 1,
    malaise ? 2 : 1,
    anorexia ? 2 : 1,
    liverBig ? 2 : 1,
    liverFirm ? 2 : 1,
    spleenPalpable ? 2 : 1,
    spiders ? 2 : 1,
    ascites ? 2 : 1,
    varices ? 2 : 1,
    parseFloat(bilirubin),
    parseInt(alkPhosphate),
    parseInt(sgot),
    parseFloat(albumin),
    parseInt(protime),
    histology ? 2 : 1
  ];
}
