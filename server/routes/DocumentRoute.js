const express = require("express");
const router = express.Router();

// Import the required middlewares
const { auth } = require("../middlewares/auth");

// Import the required controllers
const {
  createDocument,
  getAllDocuments,
  editDocument,
  deleteDocument,
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

router.get("/get-all-documents", getAllDocuments);
router.post("/create-document", auth, createDocument);
router.post("/edit-document", auth, editDocument);
router.delete("/delete-document", deleteDocument);

// ***************************************************
// Request routes
// ***************************************************

router.get("/request-documents", requestDocuments);
router.post("/approve-request", approveRequest);
router.post("/reject-request", rejectRequest);
router.get("/view-document/:id", viewDocument);

module.exports = router;
