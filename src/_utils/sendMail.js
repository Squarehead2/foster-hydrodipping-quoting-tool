const nodemailer = require("nodemailer");
require("dotenv").config();

const [, , to, subject, text, html, app_password, email_address] = process.argv;

console.log(email_address);
console.log(html);

const mailOptions = {
  from: {
    name: "Foster Hydrodipping",
    address: email_address,
  },
  to: "williamblack606@gmail.com",
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
    user: email_address,
    pass: app_password,
  },
});

const sendMail = async (transporter, mailOptions) => {
  console.log("test");
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    // console.log(error);
  }
};

// let htmlResult = convertStringToHTML(html);
sendMail(transporter, mailOptions);
