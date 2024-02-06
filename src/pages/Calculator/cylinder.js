export default function Cylinder(r, h) {
  const area = (2 * Math.PI * r * (r + h)).toFixed(2);
  return area;
}
