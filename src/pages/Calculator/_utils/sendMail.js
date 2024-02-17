const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "Fosterhydrodippingnoreply@gmail.com",
    pass: "Fosterhydro1!",
  },
});

const mailOptions = {
  from: {
    name: "Foster Hydro Dipping",
    address: "fosterhydrodippingnoreply@gmail.com",
  },
  to: "williamblack606@gmail.com",
  subject: "hello",
  text: "hello world",
  html: "<b>Hello world</b>",
};

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (err) {
    console.log(err);
  }
};

sendMail(transporter, mailOptions);
