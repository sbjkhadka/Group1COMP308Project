// load module dependencies
const config = require("./config");
const mongoose = require("mongoose");

// Define mongoose configuration method
module.exports = () => {
  // Use mongoose to connect to mongoDB
  const db = mongoose
    .connect(config.db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
      console.log("Error");
    });

  // Load User model
  require("../app/models/user.server.model");
//   require("../app/models/comments.server.model");

  // Return mongoose connection instance
  return db;
};
