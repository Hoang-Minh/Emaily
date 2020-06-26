const mongoose = require("mongoose");
const { Schema } = mongoose; // equals to const Schema = mongoose.Schema

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
});

mongoose.model("users", userSchema);
