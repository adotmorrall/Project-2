/* .ENV ============================================================== */
require("dotenv").config();

/* EXPRESS AND HANDLEBARS ============================================================== */
var express = require("express");
// var flash = require("express-flash");
// var session = require("express-session");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
// var cors = require("cors");

var app = express();

/* DATABASE ============================================================================ */
var db = require("./models");

/* PASSPORT AND BCRYPT ============================================================================ */
// var bcrypt = require("bcrypt");
// var passport = require("passport");

/* PORT ================================================================================ */
var PORT = process.env.PORT || 8080;

/* EXPRESS MIDDLEWARE ========================================================================== */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());
app.use(express.static("public"));

// app.use(flash());
// app.use(
//   session({
//     secret: process.env.sessionSECRET,
//     resave: false,
//     saveUninitialized: false
//   })
// );

/* HANDLEBARS ========================================================================== */
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

/* ROUTES ============================================================================= */
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

/* START SERVER ======================================================================= */
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
