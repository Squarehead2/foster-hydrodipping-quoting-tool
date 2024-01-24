export default function Rectangle(h, l, d) {
  let recarea = 2 * (h * l);
  let facearea = 2 * (d * l);
  let totalarea = facearea + recarea;
  return totalarea;
}
