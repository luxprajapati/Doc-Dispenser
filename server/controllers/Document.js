const DocumentModel = require("../models/DocumentModel");
const UserModel = require("../models/UserModel");
const { uploadFileToCloudinary } = require("../utils/fileUploader");

require("dotenv").config();

// Function to create a document
exports.createDocument = async (req, res) => {
  try {
    const { documentName } = req.body;
    const file = req.files.doc;

    if (!documentName || !file) {
      return res.status(400).json({
        success: false,
        message: "Document name, status and file are required",
      });
    }

    const userId = req.user.id;
    // console.log("User ID [Document]:- ", userId);

    const doc = await uploadFileToCloudinary(file, process.env.FOLDER_NAME);

    // console.log("docFile [Document]:- ", doc);

    const newDocument = await DocumentModel.create({
      documentOwner: userId,
      documentName,
      file: doc.secure_url,
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
      .populate()
      .exec();

    // console.log("get all documents [Document]:- ", documents);
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
      const file = req.files.doc;
      const doc = await uploadFileToCloudinary(file, process.env.FOLDER_NAME);
      document.file = doc.secure_url;
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
    // console.log("Document ID [Document]:- ", documentId);
    const document = await DocumentModel.findById(documentId);

    if (!document) {
      console.log("Document Not Found [Document]");
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    await DocumentModel.findByIdAndDelete(documentId);

    // // Add logging to check if req.user is defined
    // if (!req.user) {
    //   console.error("req.user is undefined");
    // } else {
    //   console.log("userId [document]:", req.user.id);
    // }

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
    const user = await UserModel.findById(req.user.id);
    // console.log("User in [Document]:- ", user);

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully [Document]",
      data: user,
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

// function to get document details
exports.getDocumentDetails = async (req, res) => {
  try {
    const { documentId } = req.body;
    // const user = req.user.id;
    const documentDetails = await DocumentModel.findOne({ _id: documentId });
    // .populate("documentOwner")
    // .exec();

    if (!documentDetails) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Document details fetched successfully [Document]",
      data: documentDetails,
    });
  } catch (error) {
    console.log(
      "Error while getting the document details [Document]:- ",
      error
    );
    return res.status(500).json({
      success: false,
      message:
        "Internal server error while getting the document details [Document]",
      error: error.message,
    });
  }
};
