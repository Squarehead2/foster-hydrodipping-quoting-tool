const nodemailer = require("nodemailer");
require("dotenv").config();
const [, , to, subject, text, html] = process.argv;
console.log(html);

const mailOptions = {
  from: {
    name: "Foster Hydrodipping",
    addres: process.env.EMAIL_ADDRESS,
  },
  to: to,
  subject: subject,
  text: text,
  html: "<div>" + html + "</div>",
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.APP_PASSWORD,
  },
});

const sendMail = async (transporter, mailOptions) => {
  console.log("test");
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error);
  }
};

// let htmlResult = convertStringToHTML(html);
sendMail(transporter, mailOptions);
