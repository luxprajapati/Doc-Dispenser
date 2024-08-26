const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {})
    .then(() => console.log("Server is Connected"))
    .catch((error) => {
      console.log("-------SERVER FAILED-------");
      console.error(error);
      process.exit(1);
    });
};
