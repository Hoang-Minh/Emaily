const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const facebookAuthRoutes = require("./routes/facebookAuthRoutes");
const billingRoutes = require("./routes/billingRoutes");
const surveyRoutes = require("./routes/surveyRoutes");
const keys = require("./config/keys");
require("./models/User");
require("./models/Survey");
require("./services/passport");
const PORT = process.env.PORT || 5000;

mongoose.connect(keys.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => console.log("database connected"))
  .on("error", () => console.log("error connected to database"));

app.use(express.json()); // the old express version would not have this feature, therefores, body-parser middleware is used instead
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
app.use(billingRoutes);
app.use(surveyRoutes);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file or main.css file
  app.use(express.static("client/build"));

  // Express will serve up the index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
