//create a function that iterates through the objects and adds up the surface areas
export default function objectAddition(objects) {
  let total = 0;
  for (let i = 0; i < objects.length; i++) {
    total += parseFloat(objects[i].area);
  }
  return total.toFixed(2);
}
