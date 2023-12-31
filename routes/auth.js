const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAuth = require("../middlewares/isAuth");

router.get("/register", isLoggedIn, (req, res) => {
  res.render("auth/register");
});

router.post(
  "/register",
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registerUser = await User.register(user, password);
      await req.login(registerUser, (err) => {
        if (err) return next(err);
        req.flash("success_msg", "You are registered and logged in");
        res.redirect("/places");
      });
    } catch (error) {
      req.flash("error_msg", error.message);
      res.redirect("/register");
    }
  })
);

router.get("/login", isLoggedIn, (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  isLoggedIn,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: {
      type: "error_msg",
      msg: "Invalid username or password",
    },
  }),
  (req, res) => {
    req.flash("success_msg", "Logged in successfully");
    res.redirect("/places");
  }
);

router.post("/logout", isAuth, (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "Logged out successfully");
    res.redirect("/login");
  });
});

module.exports = router;
