var Alert = require("../controllers/alert.server.controller");
var login = require("../controllers/login.server.controller");

module.exports = function (app) {
  // create alert
  app
    .route("/api/alert/create")
    .post(login.requiresLogin, login.isPatient, Alert.create);

  // to show a list of alert
  app.route("/api/alerts").get(Alert.list);

  // read, update, delete alert by alert Id
  app
    .route("/api/alert/:alertId")
    .get(Alert.read)
    .put(login.requiresLogin, Alert.hasAuthorization, Alert.update)
    .delete(login.requiresLogin, Alert.hasAuthorization, Alert.delete);
  app.param("alertId", Alert.infoByID);
};
