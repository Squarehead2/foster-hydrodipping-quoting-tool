export default function convertStringToHTML(inputString) {
  // Split the input string by semicolon and remove any leading/trailing whitespaces
  const sections = inputString.split(";").map((section) => section.trim());

  // Initialize the HTML result
  let htmlResult = "";

  // Loop through each section and format accordingly
  for (const section of sections) {
    if (section.startsWith("Total Price") || section.startsWith("Items")) {
      // Format Total Price and Items sections
      htmlResult += `<p>${section}</p>`;
    } else if (section.includes(":")) {
      // Format other sections with colon as a list
      const [name, data] = section.split(":").map((item) => item.trim());

      // Extract details (assuming the format Name: Value)
      const [itemName, surfaceArea, description, price] = data.split(" ");

      // Construct the HTML for the list
      htmlResult += `<ul><li>Name: ${itemName}</li><li>Surface Area: ${surfaceArea}</li><li>Description: ${description}</li><li>Price: ${price}</li></ul>`;
    }
  }

  return htmlResult;
}
