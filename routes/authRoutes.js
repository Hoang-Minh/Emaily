const passport = require("passport");
const express = require("express");
const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "openid"],
  })
);

router.get("/auth/google/callback", passport.authenticate("google"));

router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

router.get("/api/logout", (req, res) => {
  req.logOut();
  res.send(req.user);
});

module.exports = router;
