export default function SphereSlice(r, l) {
    const area = 2 * Math.PI * r * l;
    return area.toFixed(2);
}