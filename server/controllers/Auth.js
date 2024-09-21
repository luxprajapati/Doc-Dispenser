const UserModel = require("../models/UserModel");
const OtpModel = require("../models/OtpModel");
const JWT = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
// const DocumentModel = require("../models/DocumentModel");
const { mailSender } = require("../utils/mailSender");
const { passwordUpdatation } = require("../mail/templates/passwordUpdation");

require("dotenv").config();

// Function to send OTP to the user
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserPresent = await UserModel.findOne({ email });

    if (checkUserPresent) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email [Auth] ",
      });
    }

    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: true,
      lowerCaseAlphabets: true,
      specialChars: false,
      numbers: true,
    });

    let uniqueOtp = await OtpModel.findOne({ otp: otp });
    while (uniqueOtp) {
      otp = otpGenerator.generate(4, {
        upperCaseAlphabets: true,
        lowerCaseAlphabets: true,
        specialChars: false,
        numbers: true,
      });
      uniqueOtp = await OtpModel.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OtpModel.create(otpPayload);
    // console.log("OtpBody: -[Auth]", otpBody);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully [Auth]",
      otp: otp,
    });
  } catch (err) {
    console.log("Error in sending  OTP to the user [Auth]:- ", err);
    res.status(500).json({
      success: false,
      message: "Internal server error while sending otp [Auth",
    });
  }
};

// Function to signup the user
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, otp } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details [Auth]",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password should be same [Auth]",
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email [Auth]",
      });
    }

    const recentOtp = await OtpModel.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (recentOtp.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No OTP found for this email [Auth]",
      });
    } else if (recentOtp[0].otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Otp [Auth]",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    // const sharedFiles = await DocumentModel.create({
    //   documentOwner: null,
    //   documentName: null,
    //   file: null,
    //   createdAt: null,
    // });

    // const userAllFiles = await DocumentModel.create({
    //   documentOwner: null,
    //   documentName: null,
    //   file: null,
    //   createdAt: null,
    // });

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      // sharedFiles: sharedFiles._id,
      // userAllFiles: userAllFiles._id,
    });

    // console.log("User Signed up successfully [Auth]:- ", newUser);

    return res.status(200).json({
      success: true,
      message: "User signed up successfully [Auth]",
      data: newUser,
    });
  } catch (err) {
    console.log("Error in signup the user [Auth]:- ", err);
    res.status(500).json({
      success: false,
      message: "Internal server error while signup [Auth]",
    });
  }
};

// Function to login the user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details [Auth]",
      });
    }

    const userExist = await UserModel.findOne({ email }).populate().exec();
    if (!userExist) {
      return res.status(401).json({
        success: false,
        message: "User does not exist with this email [Auth]",
      });
    }

    if (await bcrypt.compare(password, userExist.password)) {
      const payload = {
        email: userExist.email,
        id: userExist._id,
      };
      // Create a token for the user
      const token = JWT.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      userExist.token = token;
      userExist.password = undefined;
      console.log("User logged in successfully [Auth]:- ", userExist);
      res
        .cookie("userInfo", token, {
          expires: new Date(Date.now() + 72 * 3600000),
          httpOnly: true,
        })
        .status(200)
        .json({
          success: true,
          message: "User logged in successfully [Auth]",
          token: token,
          data: userExist,
        });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Password [Auth]",
      });
    }
  } catch (err) {
    console.log("Error in login the user [Auth]:- ", err);
    res.status(500).json({
      success: false,
      message: "Internal server error while login [Auth]",
    });
  }
};

// Function to Changing the password
exports.changePassword = async (req, res) => {
  try {
    const userDetails = await UserModel.findById(req.user.id);
    const { oldPassword, newPassword } = req.body;

    const isPasswordMatched = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Credentials [Auth]",
      });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 12);
    const updatedUserDetails = await UserModel.findByIdAndUpdate(
      req.user.id,
      {
        password: encryptedPassword,
      },
      { new: true }
    );

    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        passwordUpdatation(
          updatedUserDetails.email,
          `Password changed successfully for 
          ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );

      console.log("Email Response [Auth]:- ", emailResponse);
    } catch (err) {
      console.log(
        "Error while notify to the user about change password [Auth]:- ",
        err
      );
      return res.status(500).json({
        success: false,
        message:
          "Internal server error while notify to the user about change password [Auth]",
        error: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password changed successfully [Auth]",
    });
  } catch (err) {
    console.log("Error in changing the password [Auth]:- ", err);
    res.status(500).json({
      success: false,
      message: "Internal server error while changing the password [Auth]",
      error: err.message,
    });
  }
};
