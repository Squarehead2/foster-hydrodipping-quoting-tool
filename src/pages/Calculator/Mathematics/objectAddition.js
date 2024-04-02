//create a function that iterates through the objects and adds up the surface areas
export default function objectAddition(objects) {
  console.log("Received objects:", objects);
  let total = 0;
  for (let i = 0; i < objects.length; i++) {
    console.log("Current object:", objects[i]);
    total += parseFloat(objects[i].area);
  }
  console.log("Total:", total.toFixed(2));
  return total.toFixed(2);
}
