const mongoose = require("mongoose");
const { Schema } = mongoose; // equals to const Schema = mongoose.Schema

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  credits: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("users", userSchema);
