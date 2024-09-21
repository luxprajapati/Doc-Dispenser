const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerification");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 4 * 60,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailReponse = await mailSender(
      email,
      "OTP Verification Email",
      otpTemplate(otp)
    );
    // console.log("Mail Send Successfully [OtpModel]");
    // console.log("Mail response:- ", mailReponse);
  } catch (err) {
    console.log("Error while sending verification email [OtpModel]:- ", err);
    throw err;
  }
}

otpSchema.pre("save", async function (next) {
  // console.log("Pre save hook called: ", this.email);
  await sendVerificationEmail(this.email, this.otp);
  next();
});
module.exports = mongoose.model("OtpModel", otpSchema);
