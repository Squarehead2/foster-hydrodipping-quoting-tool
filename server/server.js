// Server-side code (server.js)

const express = require("express");
const { exec } = require("child_process");

const app = express();
const port = 3001; // Set the port you want to use

app.get("/run-script", async (req, res) => {
  try {
    const { email, text, app_password, email_address } = req.query;
    const scriptPath = "../src/_utils/sendMail.js"; // Replace with the path to your script

    exec(
      `node ${scriptPath} " ${email}" " New Quote Generation ${Date()}" " ${text}" " ${text}" " ${app_password}" " ${email_address}"`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing sendMail.js: ${error.message}`);
          res.status(500).send("Internal Server Error");
          return;
          n;
        }

        console.log(`sendMail.js output: ${stdout}`);
        console.error(`sendMail.js errors: ${stderr}`);
      }
    );

    console.log(email);
    //console the response
  } catch (error) {
    console.error(`Error executing sendMail.js: ${error.message}`);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
