const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("TokenModel", tokenSchema);
