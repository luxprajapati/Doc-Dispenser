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
