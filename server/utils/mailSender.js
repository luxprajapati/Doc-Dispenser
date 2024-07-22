const nodemailer = require("nodemailer");
require("dotenv").config();

exports.mailSender = async (email, subject, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: "docDispenser",
      to: `${email}`,
      subject: `${subject}`,
      html: `${body}`,
    });
    console.log("Mail info:- ", info);
    return info;
  } catch (err) {
    console.log("Error while sending mail [mailSender.js]");
    console.log(err);
  }
};
