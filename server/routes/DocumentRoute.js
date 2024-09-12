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
} = require("../controllers/Document");

const {
  requestDocuments,
  approveRequest,
  rejectRequest,
  viewDocument,
} = require("../controllers/RequestDocument");

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
  "",
  validateToken,
  getDocumentsForForm
);

// ***************************************************
// Request routes
// ***************************************************

router.get("/request-documents", auth, requestDocuments);
router.post("/approve-request", approveRequest);
router.post("/reject-request", rejectRequest);
router.get("/view-document/:id", viewDocument);

module.exports = router;
