const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook");
const keys = require("../config/keys");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id); // null : no error; user.id: remember id in cookie
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id).exec();
  done(null, user); // so that after login, req.user will be available, it will point back to user in database
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      findOrCreateUser("googleId", profile, done);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientId,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      findOrCreateUser("facebookId", profile, done);
    }
  )
);

async function findOrCreateUser(type, profile, done) {
  const { id } = profile;
  const obj = {};
  obj[type] = id;

  const existingUser = await User.findOne(obj).exec();
  if (!existingUser) {
    const user = await new User(obj).save();
    done(null, user); // user will be passed to passport.serializeUser
  } else {
    done(null, existingUser); // user will be passed to passport.serializeUser
  }
}
