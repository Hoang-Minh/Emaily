// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === "production") {
  // we are in production
  module.exports = require("./prod");
} else {
  // we are in development
  module.exports = require("./dev");
}

// mongodb+srv://emaily:ejcia@5TAP8Pv@h@cluster0-uv2rc.mongodb.net/<dbname>?retryWrites=true&w=majority
//ejcia@5TAP8Pv@h

//518249262701-k72t9lg11rjs94q7je5u9e4djaapgtbn.apps.googleusercontent.com
//WkRsYNvRjlvJXnhdjWpY2Esh
