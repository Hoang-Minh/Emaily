const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const facebookAuthRoutes = require("./routes/facebookAuthRoutes");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");
const PORT = process.env.PORT || 3000;

mongoose.connect(keys.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => console.log("database connected"))
  .on("error", () => console.log("error connected to database"));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey], // can have multipel keys, random pick one, increase security
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);
app.use(facebookAuthRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
