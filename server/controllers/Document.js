const shareFomrLinkTemplate = require("../mail/templates/shareFormLinkTemplate");
const DocumentModel = require("../models/DocumentModel");
const UserModel = require("../models/UserModel");
const { uploadFileToCloudinary } = require("../utils/fileUploader");
const { mailSender } = require("../utils/mailSender");
const { v4: uuidv4 } = require("uuid");
const TokenModel = require("../models/TokenSchema");
const requestedDocumentListTemplate = require("../mail/templates/documentListRequest");
const approvedDocumentsListTemplate = require("../mail/templates/approvedDocList");
const rejectRequestMailTemplate = require("../mail/templates/rejectReason");

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

// Function to get all document of a user
exports.getAllDocumentsOfUser = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log("User ID [Document]:- ", userId);
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User ID not found",
      });
    }
    const user = await UserModel.findById(userId)
      .populate("userAllFiles")
      .exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All documents fetched successfully [Document]",
      data: user.userAllFiles,
    });
  } catch (error) {
    console.log(
      "Error while getting all the documents of a user [Document]:- ",
      error
    );
    return res.status(500).json({
      success: false,
      message:
        "Internal server error while getting all the documents of a user [Document]",
      error: error.message,
    });
  }
};

// Function to share the form link in mail

exports.shareFormLink = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log("User ID [Document]->", userId);
    const { email } = req.body;
    if (!email) {
      return res.status(404).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User ID not found",
      });
    }

    const formLink = "http://localhost:3000/document-request-form";
    // "http://192.168.31.48:3000/document-request-form";

    const token = uuidv4();

    await TokenModel.create({
      userId: userId,
      token: token,
      expiry: Date.now() + 2000 * 60 * 1000,
    });

    const username = email.split("@")[0];
    const capitalizedUsername =
      username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
    // console.log("Username [Document]->", capitalizedUsername);

    const tokenizedLink = `${formLink}/${token}`;
    // console.log("Tokenized Link [Document]->", tokenizedLink);
    const shareFormLinkMailRes = await mailSender(
      email,
      "Filled the form to get the document",
      shareFomrLinkTemplate({ capitalizedUsername, tokenizedLink })
    );
    // console.log("Mail Send Successfully [Document]->", shareFormLinkMailRes);
    return res.status(200).json({
      success: true,
      message: "Mail send successfully [Document]",
      data: shareFormLinkMailRes,
    });
  } catch (error) {
    console.log("Error in sharing the form link in mail [invite]->", error);
    return res.status(500).json({
      success: false,
      message:
        "Internal server error while sharing the form link in mail [invite]",
      error: error,
    });
  }
};

exports.getDocumentsForForm = async (req, res) => {
  try {
    const { userid } = req;
    const userDocuments = await UserModel.findById(userid)
      .populate("userAllFiles")
      .exec();

    if (!userDocuments) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All documents fetched successfully [Document]",
      data: userDocuments.userAllFiles,
    });
  } catch (error) {
    console.log(
      "Error while getting the documents for form [Document]:- ",
      error
    );
    return res.status(500).json({
      success: false,
      message:
        "Internal server error while getting the documents for form [Document]",
      error: error.message,
    });
  }
};

exports.approveRequest = async (req, res) => {
  const { documents, email } = req.query;
  if (!documents || !email) {
    return res.status(400).send("Missing documents or email parameter.");
  }

  const decodedDocuments = decodeURIComponent(documents);
  const parsedDecodeDocuments = JSON.parse(decodedDocuments);
  const doubleParsedDocuments = JSON.parse(parsedDecodeDocuments);

  try {
    const approveMailResponse = await mailSender(
      email,
      "Request Approved",
      approvedDocumentsListTemplate({ documentList: doubleParsedDocuments })
    );
    return res.send("Request approved successfully.");
  } catch (error) {
    console.log("Error while approving the request", error);
    res.status(500).send("Error approving request.");
  }
};

exports.rejectRequest = async (req, res) => {
  const { email } = req.query;
  try {
    const rejectMailResponse = await mailSender(
      email,
      "Request Rejected via DocDispenser",
      rejectRequestMailTemplate()
    );
    return res.send("Request rejected successfully.");
  } catch (error) {
    console.log("Error while rejecting the request", error);
    res.status(500).send("Error rejecting request.");
  }
};

exports.sendMailToOwner = async (req, res) => {
  try {
    const { documents, name, email } = req.body;
    const parsedDocuments = documents.map((doc) => JSON.parse(doc));
    // console.log("parsedDocuments in bd->", parsedDocuments);
    // console.log("Name-> in bd ", name);

    const documentList = parsedDocuments.map((doc) => ({
      id: doc.id,
      name: doc.documentName,
      link: doc.file,
    }));

    const { token } = req.params;
    // console.log("Token [Document] 370:- ", token);
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token is required",
      });
    }

    const tokenDetails = await TokenModel.findOne({ token });
    // console.log("Token Details [Document] 378:- ", tokenDetails);
    if (!tokenDetails) {
      return res.status(404).json({
        success: false,
        message: "Token data not found",
      });
    }

    const userId = tokenDetails.userId;
    // console.log("User ID [Document] 380:- ", userId);

    const documentOwner = await UserModel.findById(userId);
    if (!documentOwner) {
      return res.status(404).json({
        success: false,
        message: "Document Owner not found",
      });
    }

    const approveUrl = `http://localhost:3000/approve-request?documents=${encodeURIComponent(JSON.stringify(documentList))}&email=${encodeURIComponent(email)}`;
    const rejectUrl = `http://localhost:3000/reject-request?email=${encodeURIComponent(email)}`;

    const sendingMailToOwner = await mailSender(
      documentOwner.email,
      "Requested Document",
      requestedDocumentListTemplate({
        username: name,
        documentList,
        approveUrl,
        rejectUrl,
      })
    );

    return res.status(200).json({
      success: true,
      message: "Mail send successfully [Document]",
      data: sendingMailToOwner,
      user: documentOwner,
    });
  } catch (error) {
    console.log("Error while sending mail to owner [Document]:- ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while sending mail to owner [Document]",
      error: error.message,
    });
  }
};
