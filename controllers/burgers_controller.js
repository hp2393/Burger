var express = require("express");
var router = express.Router();

// Import the models to use its database functions.
var db = require("../models");

// router.get("/", function(req,res) {
//   res.send("Router is working!");
// });

// Index route
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

// Get all the burgers in the database and render the index.handlebars page 
router.get("/burgers", function(req,res){
  db.burgers.findAll().then(function(data){
    var hbsObject = {
        burgers : data
    };
    res.render("index", hbsObject);    
  });
});

// show all the burger data in the database 
router.get("/api/all", function(req,res){
  db.burgers.findAll().then(function(results){
    res.json(results);
  });
});

// Post route back to index
router.post("/burgers/create", function(req,res){
  db.burgers.create ({
    burger_name : req.body.burger_name,
    devoured : false
    }).then(function(result){
      console.log(result);
    res.redirect("/burgers");
  });
});


// Put route
router.put("/burgers/update", function(req,res){
  console.log("It worked" + req.body);
  var eaten = {
    devoured : 1
  }
  db.burgers.update (eaten, {
    where : {
      id : req.body.burger_id
    }
  }).then(function(result){
    console.log(result);
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;