module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash("error_msg", "You are already logged in and cannot enter that page!");
    res.redirect("/places");
  } else {
    next();
  }
};