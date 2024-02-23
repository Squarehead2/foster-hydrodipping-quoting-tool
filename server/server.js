// Server-side code (server.js)

const express = require("express");
const { exec } = require("child_process");

const app = express();
const port = 3001; // Set the port you want to use

app.get("/run-script", (req, res) => {
  const scriptPath = "./nodemailer/sendMail";

  exec(`node ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing sendMail.js: ${error}`);
      return res.status(500).send("Internal Server Error");
    }

    console.log(`sendMail.js output: ${stdout}`);
    console.error(`sendMail.js errors: ${stderr}`);

    res.send("Script executed successfully");
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
