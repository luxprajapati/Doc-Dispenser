const TokenModel = require("../models/TokenSchema");
const JWT = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Token Not Found!",
        data: token,
      });
    }
    console.log("Token [auth.js]: -", token);

    try {
      const decoded = await JWT.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token [auth.js]:- ", decoded);
      req.user = decoded;
    } catch (err) {
      console.log("Invalid Token [auth.js]:- ", err);
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
    next();
  } catch (err) {
    console.log("Error while validating the token [auth.js]");
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error while validating the Token[auth.js]",
    });
  }
};

exports.validateToken = async (req, res, next) => {
  try {
    const token = req.params.token;
    console.log("Token line 46 [auth.js]:- ", token);

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token is required, and it is not found",
      });
    }

    const tokenData = await TokenModel.findOne({ token: token });

    if (!tokenData) {
      return res.status(404).json({
        success: false,
        message: "Token data not found",
      });
    }

    if (tokenData.expiry < new Date()) {
      return res.status(401).json({
        success: false,
        message: "Token is expired",
      });
    }
    req.userid = tokenData.userId;
    next();
  } catch (error) {
    console.log("Error whiile validateToken [auth.js]->", error);
    return res.status(500).json({
      success: false,
      message: "Error while validating the Token[auth.js]",
      error: error,
    });
  }
};
