// prod.js - production keys here - used in heroku
module.exports = {
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  facebookClientId: process.env.FACEBOOK_CLIENT_ID,
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  mongoUri: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  strikePublishableKey: process.env.STRIKE_PUBLISHABLE_KEY,
  strikeSecretKey: process.env.STRIKE_SECRET_KEY,
};
