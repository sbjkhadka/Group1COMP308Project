// Configure PORT number
const PORT = 5000;
// Setting node environment variable
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Load dependencies
const configureMongoose = require("./config/mongoose");
const configureExpress = require("./config/express");

// Create new mongoose connection instance
const db = configureMongoose();

// Create a new express application instance
const app = configureExpress();

// Use express application to listen to designated port
app.listen(PORT);

// Exopose express instance for usage in other modules
module.exports = app;
