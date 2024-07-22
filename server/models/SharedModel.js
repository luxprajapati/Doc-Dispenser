const mongoose = require("mongoose");

const sharedSchema = new mongoose.Schema({
  documentName: {
    type: String,
    required: [true, "Document name is required"],
    trim: true,
  },
  documentOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  sharedWithName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RequestModel",
  },
  sharedWithEmail: {
    type: "mongoose.Schema.Types.ObjectId",
    ref: "RequestModel",
  },
  expiryTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("SharedModel", sharedSchema);
