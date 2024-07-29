const RequestModel = require("../models/RequestModel");
const { mailSender } = require("../utils/mailSender");
const requestedDocumentListTemplate = require("../mail/templates/documentListRequest");
const { secureUrlGenerator } = require("../utils/secureUrlGenerator");
const approvedDocumentsListTemplate = require("../mail/templates/approvedDocList");
const rejectRequestMailTemplate = require("../mail/templates/rejectReason");
const DocumentModel = require("../models/DocumentModel");
const JWT = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

exports.requestDocuments = async (req, res) => {
  try {
    const { requestedUser, requestedUserEmail, requestDocuments } = req.body;

    if (!requestedUser || !requestedUserEmail || !requestDocuments) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields [RequestDocument]",
      });
    }

    const newRequest = await RequestModel.create({
      requestedUser,
      requestedUserEmail,
      requestedDocument: requestDocuments,
    });
    console.log(newRequest);

    const approveLink = `http://localhost:3000/approve-request/${newRequest._id}`;
    const rejectLink = `http://localhost:3000/reject-request/${newRequest._id}`;

    const user = req.user;
    console.log("User [RequestDocument]:- ", user);
    try {
      const sendingRequestMail = await mailSender(
        user.email,
        "Request for the document",
        requestedDocumentListTemplate(
          requestedUser,
          requestedUserEmail,
          requestDocuments,
          approveLink,
          rejectLink
        )
      );
      console.log(
        "RequestDocument Mail Sent Successfully:-[RequestDocument] ",
        sendingRequestMail
      );
    } catch (err) {
      console.log(
        "Error while sending request for document mail error [RequestDocument]:- ",
        err
      );
      return res.status(500).json({
        success: false,
        message:
          "Internal server error while sending request for document mail error [RequestDocument]",
        error: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Request sent successfully [RequestDocument]",
      data: newRequest,
    });
  } catch (err) {
    console.log(
      "Error while requesting the document [RequestDocument]:- ",
      err
    );
    return res.status(500).json({
      success: false,
      message:
        "Internal server error while requesting the document [RequestDocument]",
      error: err.message,
    });
  }
};

exports.approveRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const { expiryTime } = req.body;
    const request = await RequestModel.findById(requestId);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found [RequestDocument]",
      });
    }

    request.requestStatus = "approved";
    await request.save();

    const approvedDocumentList = request.requestedDocument.map((doc) => ({
      docId: doc._id,
      expiryTime: expiryTime,
    }));

    await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { sharedFiles: { $each: approvedDocumentList } },
      },
      { new: true }
    );

    if (expiryTime !== 0) {
      setTimeout(async () => {
        await UserModel.findByIdAndUpdate(
          req.user._id,
          {
            $pull: {
              sharedFiles: { expiryTime: { $lte: new Date() } },
            },
          },
          {
            new: true,
          }
        );
      }, expiryTime);
    }

    const secureLinks = request.requestedDocument.map((doc) =>
      secureUrlGenerator(doc._id, expiryTime)
    );

    try {
      const sendingApprovedMail = await mailSender({
        email: request.requestedUserEmail,
        subject: "Approved Document List",
        approvedDocumentsListTemplate: approvedDocumentsListTemplate(
          secureLinks,
          request.requestedDocument,
          expiryTime
        ),
      });

      console.log(
        "Approved Mail with Documents Sent Successfully [RequestDocument] :- ",
        sendingApprovedMail
      );
    } catch (err) {
      console.log(
        "Error while sending Approved Mail with Documents [RequestDocument]:- ",
        err
      );
      return res.status(500).json({
        success: false,
        message:
          "Internal server error while sending Approved Mail with Documents [RequestDocument]",
        error: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Request approved successfully [RequestDocument]",
      data: request,
    });
  } catch (err) {
    console.log("Error while approving the request [RequestDocument]:- ", err);
    return res.status(500).json({
      success: false,
      message:
        "Internal server error while approving the request [RequestDocument]",
      error: err.message,
    });
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const request = await RequestModel.findById(requestId);
    const { reason } = req.body;
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found [RequestDocument]",
      });
    }

    request.requestStatus = "rejected";
    await request.save();

    try {
      const sendingRejectMail = await mailSender({
        email: request.requestedUserEmail,
        subject: "Request Rejected",
        rejectReason: rejectRequestMailTemplate(reason),
      });

      console.log(
        "Mail sent successfully for reject request [RequestDocument] :- ",
        sendingRejectMail
      );
    } catch (err) {
      console.log(
        "Error while sending mail for reject request [RequestDocument]:- ",
        err
      );
      return res.status(500).json({
        success: false,
        message:
          "Internal server error while sending mail for reject request [RequestDocument]",
        error: err.message,
      });
    }
  } catch (err) {
    console.log("Error while rejecting the request [RequestDocument]:- ", err);
    return res.status(500).json({
      success: false,
      message:
        "Internal server error while rejecting the request [RequestDocument]",
      error: err.message,
    });
  }
};

exports.viewDocument = async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    const documentId = decoded.documentId;
    const document = await DocumentModel.findById(documentId);
    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found [RequestDocument]",
      });
    }

    // Set headers to prevent download and screenshots
    res.setHeader("Content-Security-Policy", "script-src 'self'");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader(
      "Content-Disposition",
      'inline; filename="' + document.documentName + '"'
    );

    // Serve the document
    res.sendFile(document.file); // Ensure the file path is correct
  } catch (err) {
    console.log("Error while viewing the document [RequestDocument]:- ", err);
    return res.status(500).json({
      success: false,
      message:
        "Internal server error while viewing the document [RequestDocument]",
      error: err.message,
    });
  }
};
