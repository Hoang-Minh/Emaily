const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook"));

module.exports = router;
