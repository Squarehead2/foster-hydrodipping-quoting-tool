const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable parsing of JSON request bodies

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Fosterhydrodippingnoreply@gmail.com",
      pass: "Fosterhydro1!",
    },
  });

  const mailOptions = {
    from: "Fosterhydrodippingnoreply@gmail.com",
    to: "williamblack606@gmail.com",
    subject: `New message from ${name} at ${email}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
