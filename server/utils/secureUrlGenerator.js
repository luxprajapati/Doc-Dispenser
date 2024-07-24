const JWT = require("jsonwebtoken");
require("dotenv").config();

exports.secureUrlGenerator = (documentId, expiryTime) => {
  const token = JWT.sign(documentId, process.env.JWT_SECRET, {
    expireIn: expiryTime,
  });
  return `${process.env.APP_URL}/view-${documentId.documentName}document/${token}`;
};
