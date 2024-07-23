const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  documentOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  documentName: {
    type: String,
    required: [true, "Document name is required"],
    trim: true,
  },
  file: {
    type: String,
    required: [true, "File url is required"],
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("DocumentModel", documentSchema);
