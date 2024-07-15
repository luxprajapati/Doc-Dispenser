const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  documentName: {
    type: String,
    required: [true, "Document name is required"],
    trim: true,
  },
  documentType: {
    type: String,
    enum: ["pdf", "doc", "docx", "txt", "jpg", "jpeg", "png"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  encryptedData: {
    type: Buffer,
    required: true,
  },
});

module.exports = mongoose.model("DocumenModel", documentSchema);
