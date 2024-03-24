// React component code
const runSendMailScript = async (text) => {
  alert(
    "Quote has been sent to business owner, and will respond as soon as possible."
  );
  try {
    const email = "williamblack606@gmail.com";

    const response = await fetch(
      `http://localhost:3001/run-script?email=${email}&text=${text}&app_password=${process.env.REACT_APP_APP_PASSWORD}&email_address=${process.env.REACT_APP_EMAIL_ADDRESS}`
    );

    console.log("Response:", response);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error("Error triggering script:", error);
  }
};

export default runSendMailScript;
