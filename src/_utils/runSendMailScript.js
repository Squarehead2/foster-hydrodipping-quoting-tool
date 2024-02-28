// React component code
const runSendMailScript = async (text) => {
  try {
    const email = "williamblack606@gmail.com";

    const response = await fetch(
      `http://localhost:3001/run-script?email=${email}&text=${text}`
    );
    console.log("Response:", response);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error("Error triggering script:", error);
  }
};

export default runSendMailScript;
