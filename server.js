
// Dependencies
var express = require("express");
var bodyParser = require("body-parser")
var mysql = require("mysql")

// Sets up the Express App

var app = express();
var PORT = process.env.PORT || 3000;


// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");


// Static directory
app.use(express.static("public"));

require("./routes/patient-api-routes")(app);
require("./routes/html-routes")(app);
require("./routes/post-api-routes")(app);



// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: true }).then(function() {

    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });


