const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URL, {})
    .then(() => {
      console.log("docDispenser database connected");
    })
    .catch((err) => {
      console.log("docDispenser database connection failed!");
      console.log(err);
      process.exit(1);
    });
};
