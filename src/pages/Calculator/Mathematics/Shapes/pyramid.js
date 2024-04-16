export default function pyramid(numberOfSides, sideLength, height) {
  if (!Number.isInteger(numberOfSides)) {
    numberOfSides = 3;
  }

  return (
    (numberOfSides * Math.pow(sideLength, 2) +
      (numberOfSides *
        sideLength *
        Math.sqrt(Math.pow(sideLength, 2) - Math.pow(sideLength / 2, 2))) /
        2) *
    height
  ).toFixed(2);
}
