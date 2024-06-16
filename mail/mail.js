import "dotenv/config";
import nodemailer from "nodemailer";

const { MAILTRAP_USERNAME, MAILTRAP_PASSWORD, SENDER, HOST } = process.env;

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAILTRAP_USERNAME,
    pass: MAILTRAP_PASSWORD,
  },
});

export default function sendMail(email, token) {
  const message = {
    to: email,
    from: SENDER,
    subject: "Welcome to Phone book",
    html: `To confirm your email please click on the <a href="${HOST}/api/users/verify/${token}">link</a>`,
    text: `To confirm your email please open the link ${HOST}/api/users/verify/${token}`,
  };

  return transport.sendMail(message);
}
