require("dotenv").config();
var db = require("../models");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

module.exports = function(app) {
  /* LOGIN/REGISTER ==================================================================== */
  app.post("/register", function(req, res) {
    var userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    };
    db.User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(function(user) {
        if (!user) {
          var hashedPassword = bcrypt.hashSync(
            userData.password,
            bcrypt.genSaltSync(10),
            null
          );
          userData.password = hashedPassword;
          db.User.create(userData)
            .then(function(user) {
              //   console.log(process.env);

              var token = jwt.sign(
                user.dataValues,
                process.env.SESSION_SECRET,
                {
                  expiresIn: 1440
                }
              );
              //   res.json({ token: token });
              res.redirect("/dashboard");
            })
            .catch(function(err) {
              res.send("error: " + err);
            });
        } else {
          res.json({ error: "User already exists" });
        }
      })
      .catch(function(err) {
        res.send("error: " + err);
      });
  });

  //LOGIN
  app.post("/login", function(req, res) {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(function(user) {
        if (!user) {
          return res.status(404).send("User Not Found."); // TODO: User not found message
        }
        var validPassword = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!validPassword) {
          return res.status(401).send({
            auth: false,
            accessToken: null,
            reason: "Invalid Password" // TODO: Invalid password message
          });
        } else {
          jwt.sign({ id: user.id }, process.env.SESSION_SECRET, function(
            token
          ) {
            res
              .status(200)
              .cookie("jwt", token, {
                expiresIn: 864000
              })
              .redirect("/dashboard");
          });
        }
      })
      .catch(function(err) {
        res.status(500).send("error: " + err);
      });
  });

  //   // USER IS AUTHENTICATED
  //   app.get("/dashboard", function(req, res) {
  //     var token = req.cookies.jwt;
  //     console.log(token);
  //     try {
  //       jwt.verify(token, process.env.SESSION_SECRET);
  //       res.render("dashboard");
  //     } catch (err) {
  //       res.redirect("/");
  //     }
  //   });

  //   app.get("/dashboard", function(req, res) {
  //     var decoded = jwt.verify(
  //       req.headers.authorization,
  //       process.env.SESSION_SECRET
  //     );
  //     db.User.findOne({
  //       where: {
  //         id: decoded.id
  //       }
  //     })
  //       .then(function(user) {
  //         if (user) {
  //           res.json(user);
  //         } else {
  //           res.send("User does not exist");
  //         }
  //       })
  //       .catch(function(err) {
  //         res.send("error: " + err);
  //       });
  //   });

  //   app.post(
  //     "/register",
  //     /*checkNotAuthenticated,*/ async (req, res) => {
  //       try {
  //         var hashedPassword = await bcrypt.hash(req.body.password, 10);
  //         // console.log(hashedPassword);
  //         /*var user = await */ db.User.create({
  //           firstName: req.body.firstName,
  //           lastName: req.body.lastName,
  //           email: req.body.email,
  //           password: hashedPassword
  //         });
  //         // res.json(user);
  //         res.redirect("/dashboard"); // redirects to login after register but could redirect to logged in homepage
  //       } catch (err) {
  //         // print the error details
  //         console.log(err, req.body.email);
  //         res.json(err);
  //       }
  //     }
  //   );

  // Log out and clear cookies
  app.post("/logout", function(req, res) {
    res.redirect("/"); //redirect to logged out view (homepage)
  });

  //   function checkAuthenticated(req, res, next) {
  //     if (req.isAuthenticated()) {
  //       return next();
  //     } else {
  //       res.redirect("/login"); //prevents users that are not logged in from viewing things they don't need to see
  //     }
  //   }

  //   function checkNotAuthenticated(req, res, next) {
  //     if (req.isAuthenticated()) {
  //       return res.redirect("/dashboard");
  //     } else {
  //       next();
  //     }
  //   }

  /* REVIEWS ==================================================================== */

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
