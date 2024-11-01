const express = require("express");
const app = express();
require("dotenv").config();

const userRoute = require("./routes/UserRoute");
const documentRoute = require("./routes/DocumentRoute");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 5000;

// connect the database
database.connectDB();
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "https://doc-dispenser.vercel.app",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// cloudinary connection
cloudinaryConnect();

const authRouter = require("./routes/UserRoute");
// routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/document", documentRoute);
app.use("/api/v1/google-auth", authRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

server.on("error", (err) => {
  console.log("ERROR WHILE CONNECTING TO THE DATABASE SERVER :- ", err);
});
