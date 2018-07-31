var orm = require("./connection.js");

module.exports = function (app, connect) {
function selectAll(app) {
    app.get(/*"/"*/"/", function(req, res) {
        connection.query("SELECT * FROM burgers;", function(err, data) {
          if (err) throw err;
      
          // Test it
          // console.log('The solution is: ', data);
      
          // Test it
          // return res.send(data);
      
          res.render("index", { burgers: data });
        });
      });
}
function insertOne(app) {
    app.post(/*"/"*/"/", function(req, res) {
        // Test it
        // console.log('You sent, ' + req.body.task);
      
        // Test it
        // return res.send('You sent, ' + req.body.task);
      
        // When using the MySQL package, we'd use ?s in place of any values to be inserted, which are then swapped out with corresponding elements in the array
        // This helps us avoid an exploit known as SQL injection which we'd be open to if we used string concatenation
        // https://en.wikipedia.org/wiki/SQL_injection
        connection.query("INSERT INTO wishes (wish) VALUES (?)", [req.body.wish], function(err, result) {
          if (err) throw err;
      
          res.redirect("/");
        });
      });
}
function updateOne(app) {
    app.put(/*"/todos/:id"*/"/todos/:id", function(req, res) {
        connection.query("UPDATE plans SET plan = ? WHERE id = ?", [req.body.plan, req.params.id], function(err, result) {
          if (err) {
            // If an error occurred, send a generic server failure
            return res.status(500).end();
          }
          else if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          }
          res.status(200).end();
      
        });
      });
}
}