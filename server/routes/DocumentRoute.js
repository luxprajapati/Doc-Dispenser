const express = require("express");
const router = express.Router();

// Import the required middlewares
const { auth, validateToken } = require("../middlewares/auth");

// Import the required controllers
const {
  createDocument,
  getAllDocuments,
  editDocument,
  deleteDocument,
  getDocumentDetails,
  getAllDocumentsOfUser,
  shareFormLink,
  getDocumentsForForm,
  sendMailToOwner,
  approveRequest,
  rejectRequest,
} = require("../controllers/Document");

// const {
//   requestDocuments,
//   approveRequest,
//   rejectRequest,
//   viewDocument,
// } = require("../controllers/RequestDocument");

// ****************************************************
// Document Routes
// ****************************************************

router.post("/create-document", auth, createDocument);
router.get("/get-all-documents", getAllDocuments);
router.post("/edit-document", auth, editDocument);
router.delete("/delete-document", auth, deleteDocument);
router.post("/get-document-details", auth, getDocumentDetails);
router.get("/get-all-documents-of-user", auth, getAllDocumentsOfUser);
router.post("/share-form-link", auth, shareFormLink);
router.get(
  "/get-documents-for-form/:token",
  validateToken,
  getDocumentsForForm
);
router.post("/send-mail-to-owner/:token", sendMailToOwner);
router.get("/approve-request", approveRequest);
router.get("/reject-request", rejectRequest);

// ***************************************************
// Request routes
// ***************************************************

// router.get("/request-documents", auth, requestDocuments);
// router.post("/approve-request", approveRequest);
// router.post("/reject-request", rejectRequest);
// router.get("/view-document/:id", viewDocument);

module.exports = router;
