const mongoose = require("mongoose");

const sharedSchema = new mongoose.Schema({
  documents: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DocumentModel",
    required: true,
  },
  sharedUserName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RequestModel",
    required: true,
  },
  sharedUserEmail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RequestModel",
    required: true,
  },
  expiryTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("SharedModel", sharedSchema);
