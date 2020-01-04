var db = require("../models");

module.exports = function(app) {
  // Get all reviews
  app.get("/api/reviews", function(req, res) {
    db.Review.findAll({}).then(function(dbReviews) {
      res.json(dbReviews);
    });
  });

  // Create a new review
  app.post("/api/reviews", function(req, res) {
    db.Review.create(req.body).then(function(dbReview) {
      res.json(dbReview);
    });
  });

  // Delete an review by id
  app.delete("/api/reviews/:id", function(req, res) {
    db.Review.destroy({ where: { id: req.params.id } }).then(function(
      dbReview
    ) {
      res.json(dbReview);
    });
  });
};
