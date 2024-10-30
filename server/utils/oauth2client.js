const { google } = require("googleapis");

const GoogleClientID = process.env.GOOGLE_CLIENT_ID;
const GoogleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

console.log("oauth2client.js");
console.log("GoogleClientID", GoogleClientID);
console.log("GoogleClientSecret", GoogleClientSecret);

exports.oauth2client = new google.auth.OAuth2(
  GoogleClientID,
  GoogleClientSecret,
  "postmessage"
);
