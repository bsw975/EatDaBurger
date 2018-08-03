var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 9999;
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static(__dirname + '/public/'));
// questions: does conn.js need the require mysql?


var mysql = require("mysql");
var connect = require("./db/config/connection.js")(mysql);
var orm = require("./db/config/orm.js")(app, connect);
var l = console.log;

var connection = mysql.createConnection({ // create connection
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "burgers_db"
});
connection.connect(function (err) { // connect it
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

app.get("/", function (req, res) {
    connection.query("SELECT * FROM burgers;", function (err, data) {
        // filter the burgers in the DB to two arrays
        // eaten or not. Add those arrays to a new object
        readyToEatBurgers = data.filter(
            function (obj) {
                return obj.devoured == false;
            });
        eatenBurgers = data.filter(
            function (obj) {
                return obj.devoured == true;
            });
        var twoBurgerArrays = {
            ready: readyToEatBurgers,
            eaten: eatenBurgers
        }
        if (err) throw err;
        res.render("index", { burgers: twoBurgerArrays }); // push the burgers object down to the client
    }); //end connection.query
}); // end app.get

app.post("/add", function (req, res) {
    connection.query("INSERT INTO burgers (burger_name, devoured) VALUES (?, 0);", req.body.burger, function (err, sqlData) {
        if (err) {
            return res.status(500).end()
        };
        // Send to the client the ID of the added burgere
        // res.send("foo");
        res.send({ id: sqlData.insertId });
    });
});

app.post("/eat", function (req, res) {
    connection.query("UPDATE burgers SET devoured = 1 WHERE id = ?", req.body.burgerid, function (err, sqlData) {
        if (err) {
            return res.status(500).end()
        };
        // Send to the client the ID of the added burgere
        res.send({ id: sqlData.insertId });
    });
});

app.post("/reset", function (req, res) {
    connection.query(
        "DROP TABLE  burgers; CREATE TABLE burgers (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,            burger_name VARCHAR(35),            devoured BOOLEAN)", function (err, sqlData) {
        if (err) {
            return res.status(500).end()
        };
    });
});
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});