var express = require("express");
var PORT = process.env.PORT || 3000;
var app = express();

var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller");

app.use(routes);

// listen on port 3000
db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
	console.log("Server listening on: http://localhost:" + PORT);
	});
});