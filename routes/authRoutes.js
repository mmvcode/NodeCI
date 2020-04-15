const passport = require("passport");

module.exports = (app) => {
  app.get("/auth/google", function (req, res, next) {
    console.log("AUTH");
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })(req, res, next);
  });

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/blogs");
    }
  );

  app.get("/auth/logout", (req, res) => {
    console.log("LOGOUT");
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
