const keys = require("../config/keys");
const stripe = require("stripe")(keys.strikeSecretKey);
const requireLogin = require("../middlewares/requireLogin");
const express = require("express");
const router = express.Router();

router.post("/api/stripe", requireLogin, async (req, res) => {
  const { id } = req.body;

  const charge = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    description: "$5 for 5 credits",
    source: id,
  });

  req.user.credits += 5;
  const user = await req.user.save();

  res.send(user);
});

module.exports = router;
