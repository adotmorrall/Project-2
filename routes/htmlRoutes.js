var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  //Load login page
  app.get("/login", function(req, res) {
    res.render("login");
  });

  //Load register page
  app.get("/register", function(req, res) {
    res.render("register");
  });

  //Load dashboard page
  app.get("/dashboard", function(req, res) {
    res.render("dashboard");
  });

  // Load reviews page
  app.get("/reviews", function(req, res) {
    db.Review.findAll({}).then(function(dbReviews) {
      res.render("reviews", {
        msg: "Welcome!",
        reviews: dbReviews
      });
    });
  });

  // Load review page and pass in an review by id
  app.get("/review/:id", function(req, res) {
    db.Review.findOne({ where: { id: req.params.id } }).then(function(
      dbReview
    ) {
      res.render("review", {
        review: dbReview
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
