const UserModel = require("../models/UserModel");
const { mailSender } = require("../utils/mailSender");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Function to reset the password token
exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with this email [ResetPassword]",
      });
    }
    const token = crypto.randomBytes(20).toString("hex");

    const updatedDetails = await UserModel.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpiry: Date.now() + 3600000,
      },
      { new: true }
    );
    // console.log("Updated Details [ResetPassword]:- ", updatedDetails);

    const uri = `http://localhost:3000/resetpassword/${token}`;

    await mailSender(
      email,
      "Password Reset ",
      `Your password reset link is these ${uri}`
    );

    return res.status(200).json({
      success: true,
      message: "Reset password link sent successfully [ResetPassword]",
      data: updatedDetails,
    });
  } catch (err) {
    console.log(
      "Error while generating the reset password token [ResetPassword]:- ",
      err
    );
    return res.status(500).json({
      success: false,
      message:
        "Internal server error while generating the reset password token [ResetPassword]",
      error: err.message,
    });
  }
};

// Function to reset the password
exports.resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;
    if (!token || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields [ResetPassword]",
      });
    }

    const existingUser = await UserModel.findOne({ token: token });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token [ResetPassword]",
      });
    }
    if (existingUser.resetPasswordExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token expired [ResetPassword]",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password should be same [ResetPassword]",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const updatedUser = await UserModel.findOneAndUpdate(
      { token },
      { password: hashedPassword },
      { new: true }
    );

    console.log(
      "Updated User After password change [ResetPassword]:- ",
      updatedUser
    );
    return res.status(200).json({
      success: true,
      message: "Password reset successfully [ResetPassword]",
    });
  } catch (err) {
    console.log("Error while resetting the password [ResetPassword]:- ", err);
    return res.status(500).json({
      success: false,
      message:
        "Internal server error while resetting the password [ResetPassword]",
      error: err.message,
    });
  }
};
