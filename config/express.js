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
  app.use(methodOverride()); 

  app.use(methodOverride("_method"));
 
  app.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: config.sessionSecret,
    })
  );
  
  app.get('/',(req,res)=>{
    res.send("Hello Final Project")
  });

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

