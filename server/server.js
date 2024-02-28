// Server-side code (server.js)

const express = require("express");
const { exec } = require("child_process");

const app = express();
const port = 3001; // Set the port you want to use

app.get("/run-script", async (req, res) => {
  try {
    const { email, text } = req.query;
    const scriptPath = "../nodemailer/sendMail.js"; // Replace with the path to your script

    const { stdout, stderr } = exec(
      `node ${scriptPath} " ${email}" " New Quote Generation ${Date()}" " ${text}" " test"`
    );

    console.log(`sendMail.js output: ${stdout}`);
    console.error(`sendMail.js errors: ${stderr}`);

    res.send("Script executed successfully");
  } catch (error) {
    console.error(`Error executing sendMail.js: ${error.message}`);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
