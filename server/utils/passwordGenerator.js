const crypto = require("crypto");

const generateRandomPassword = (name, email, id) => {
  const randomPassword = crypto.randomBytes(30).toString("hex");
  console.log("Random Password:- ", randomPassword);
  return randomPassword + name + email + id;
};

exports.passwordGenerator = (userData) => {
  console.log("User Data:- ", userData);
  return generateRandomPassword(userData.name, userData.email, userData.id);
};
