const express = require("express");
const router = express.Router();

// Import the required middlewares
const { auth } = require("../middlewares/auth");

// import the required controllers
const {
  sendOtp,
  signup,
  login,
  changePassword,
} = require("../controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

// Routes for login, signup & change password

// *********************************************************
// Authentications Routes
// *********************************************************

router.post("/signup", signup);
router.post("/login", login);
router.post("/sendotp", sendOtp);
router.post("/change-password", auth, changePassword);

// *********************************************************
// Reset Password Routes
// *********************************************************

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

// google auth
const authController = require("../controllers/Auth");
router.get("/google", authController.googleAuth);

// Export the router for using in main app
module.exports = router;
