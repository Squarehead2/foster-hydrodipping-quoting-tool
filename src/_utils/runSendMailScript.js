// React component code

const runSendMailScript = async () => {
  try {
    const response = await fetch("http://localhost:3001/run-script");
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error("Error triggering script:", error);
  }
};

export default runSendMailScript;

