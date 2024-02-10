export default function verifySurfaceArea(area) {
  if (
    area === 0 ||
    area === "" ||
    area === undefined ||
    area === null ||
    isNaN(area) ||
    area < 0
  ) {
    return false;
  } else {
    return true;
  }
}
