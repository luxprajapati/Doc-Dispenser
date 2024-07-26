const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {})
    .then(() => console.log("Doc-Dispenser Server is Connected"))
    .catch((error) => {
      console.log("-------Doc-Dispenser SERVER FAILED-------");
      console.error(error);
      process.exit(1);
    });
};
