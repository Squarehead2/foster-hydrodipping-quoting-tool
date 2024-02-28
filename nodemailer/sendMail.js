const nodemailer = require("nodemailer");
const [, , to, subject, text, html] = process.argv;
const mailOptions = {
  from: {
    name: "Foster Hydrodipping",
    addres: "fosterhydrodippingnoreply@gmail.com",
  },
  to: to,
  subject: subject,
  text: text,
  html: "<b>" + html + "</b>",
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "fosterhydrodippingnoreply@gmail.com",
    pass: "wddzoynyezkgcgop", //xdst fags gbyg bjf
  },
});

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error);
  }
};

sendMail(transporter, mailOptions);
