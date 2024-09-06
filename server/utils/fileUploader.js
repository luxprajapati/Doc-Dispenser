const cloudinary = require("cloudinary").v2;
const path = require("path");

exports.uploadFileToCloudinary = async (file, folder) => {
  try {
    const options = { folder: folder };
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (err) {
    console.log(
      "Error while uploading file to cloudinary [fileUploader.js]:- ",
      err
    );
    throw err;
  }
};
