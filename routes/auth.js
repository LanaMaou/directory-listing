const express = require("express");
const router = express.Router();
const User = require("../models/user");
const AuthController = require("../controllers/auth");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAuth = require("../middlewares/isAuth");

router
  .route("/register")
  .get(isLoggedIn, AuthController.registerForm)
  .post(isLoggedIn, wrapAsync(AuthController.register));

router
  .route("/login")
  .get(isLoggedIn, AuthController.loginForm)
  .post(
    isLoggedIn,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: {
        type: "error_msg",
        msg: "Invalid username or password",
      },
    }),
    AuthController.login
  );

router.post("/logout", isAuth, AuthController.logout);

module.exports = router;
