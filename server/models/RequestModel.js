const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  requestedUser: {
    type: String,
    required: true,
    trim: true,
  },
  requestedUserEmail: {
    type: String,
    required: true,
    trim: true,
  },
  requestedDocument: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocumentModel",
    },
  ],
  requestStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("RequestModel", requestSchema);
