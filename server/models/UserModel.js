const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  sharedFiles: [
    {
      documentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DocumentModel",
      },
      expiryTime: {
        type: Date,
        default: null,
      },
    },
  ],
  userAllFiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocumentModel",
    },
  ],
  token: {
    type: String,
  },
  resetPasswordExpiry: {
    type: Date,
  },
});

module.exports = mongoose.model("UserModel", userSchema);
