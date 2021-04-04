// const express = require("express");
// const config = require("./config");
// const morgan = require("morgan");
// const compress = require("compression");
// const bodyParser = require("body-parser");
// const methodOverride = require("method-override");
// const session = require("express-session");

// module.exports = () => {
//   // Create a new express application instance
//   const app = express();

//   // Use NODE_ENV variable to activate morgan logger or compress middleware
//   if (process.env.NODE_ENV === "development") {
//     app.use(morgan("dev"));
//   } else if (process.env.NODE_ENV === "development") {
//     app.use(compress());
//   }

//   // Use body parser and method override middle ware functions
//   app.use(bodyParser.urlencoded({ extended: true }));
//   app.use(bodyParser.json());
//   app.use(methodOverride());

//   // Configure session middleware
//   app.use(
//     session({
//       saveUninitialized: true,
//       resave: true,
//       secret: config.sessionSecret,
//     })
//   );

//   // Set view engine and view folder, We don't require this but I am just keeping it here in case we need it for testing
//   app.set("views", "./app/views");
//   app.set("view engine", "ejs");
//   app.engine("html", require("ejs").renderFile);

//   // Configure static file serving __dirname + '/../app'
//   // We don't require this but I am just keeping it here in case we need it for testing
//   app.use(express.static("./public"));

//   // Load index routing file
//   require("../app/routes/user.server.routes.js")(app);
//   // require("../app/routes/index.server.routes.js")(app);
//   // require("../app/routes/display.server.routes.js")(app);

//   // Return the instance of application
//   return app;
// };

// Load the module dependencies
var config = require("./config"),
  express = require("express"),
  morgan = require("morgan"),
  compress = require("compression"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Create a new Express application instance
module.exports = function () {
  //Create the Express application object
  var app = express();
  //the process.env property allows you to access predefined environment variables
  //such as NODE_ENV
  // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else if (process.env.NODE_ENV === "production") {
    app.use(compress());
  }
  // Use the 'body-parser' and 'method-override' middleware functions
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json()); //use middleware that only parses json
  app.use(cookieParser());
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  app.use(cors());
  //
  app.use(methodOverride()); // use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
  //handle the use of PUT or DELETE methods
  //override with POST having ?_method=DELETE or
  // ?_method=PUT
  app.use(methodOverride("_method"));
  //saveUninitialized - orces a session that is "uninitialized" to be saved to the store
  //resave - forces the session to be saved back to the session store
  // Configure the 'session' middleware
  app.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: config.sessionSecret,
    })
  );
  //Configure Express to use EJS module as the default template engine
  // Set the application view engine and 'views' folder
  app.set("views", "./app/views");
  app.set("view engine", "ejs");
  app.engine("html", require("ejs").renderFile);
  //bootstrap the app using the controller and routing modules

  // Load the routing files
  require("../app/routes/user.server.routes.js")(app);

  //The express.static() middleware takes one argument
  //to determine the location of the static folder
  //Configure static file serving
  app.use(express.static("./public"));
  return app;
};

