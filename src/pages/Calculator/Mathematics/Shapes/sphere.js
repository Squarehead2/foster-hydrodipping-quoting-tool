export default function Sphere(r, cut) {
  const area = 4 * Math.PI * (r * r) - cut;
  return area.toFixed(2);
}
