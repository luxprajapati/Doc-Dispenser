const DocumentModel = require("../models/DocumentModel");
const UserModel = require("../models/UserModel");
const { uploadFileToCloudinary } = require("../utils/fileUploader");

require("dotenv").config();

// Function to create a document
exports.createDocument = async (req, res) => {
  try {
    const { documentName, status } = req.body;
    const file = req.files.docFile;

    if (!documentName || !status || !file) {
      return res.status(400).json({
        success: false,
        message: "Document name, status and file are required",
      });
    }

    const userId = req.user.id;

    const docFile = await uploadFileToCloudinary(file, process.env.FOLDER_NAME);

    const newDocument = await DocumentModel.create({
      documentOwner: req.user.email,
      documentName,
      file: docFile.secure_url,
    });

    await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          userAllFiles: newDocument._id,
        },
      },
      {
        new: true,
      }
    );

    return res.status(201).json({
      success: true,
      message: "Document created successfully [Document]",
      data: newDocument,
    });
  } catch (err) {
    console.log("Error while creating thr document [Document]:- ", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating the document [Document]",
    });
  }
};

// Function to get all documents
exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await DocumentModel.find(
      {},
      {
        documentName: 1,
        file: 1,
      }
    )
      .populate("documentOwner")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All documents fetched successfully [Document]",
      data: documents,
    });
  } catch (err) {
    console.log("Error while getting all the documents [Document]:- ", err);
    return res.status(500).json({
      success: false,
      message:
        "Internal server error while getting all the documents [Document]",
    });
  }
};

// Function to edit the document
exports.editDocument = async (req, res) => {
  try {
    const { documentId } = req.body;
    const updates = req.body;
    const document = await DocumentModel.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (req.files) {
      const file = req.files.docFile;
      const docFile = await uploadFileToCloudinary(
        file,
        process.env.FOLDER_NAME
      );
      document.file = docFile.secure_url;
    }

    for (const key in updates) {
      document[key] = updates[key];
    }

    await document.save();

    const updatedDocs = await DocumentModel.findOne({
      _id: documentId,
    })
      .populate("documentOwner")
      .populate("documentName")
      .populate("file")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Document updated successfully [Document]",
      data: updatedDocs,
    });
  } catch (err) {
    console.log("Error while editing the document [Document]:- ", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while editing the document [Document]",
      error: err.message,
    });
  }
};

// Function to delete the document
exports.deleteDocument = async (req, res) => {
  try {
    const { documentId } = req.body;
    const document = await DocumentModel.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    await document.findByIdAndDelete(documentId);

    await UserModel.findByIdAndUpdate(
      {
        _id: req.user.id,
      },
      {
        $pull: {
          userAllFiles: documentId,
          sharedFiles: documentId,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully [Document]",
    });
  } catch (err) {
    console.log("Error while deleting the document [Document]:- ", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting the document [Document]",
      error: err.message,
    });
  }
};
