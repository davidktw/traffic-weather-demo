export function calcCoordinatesDists(pointA, pointB) {
  return Math.sqrt(Math.pow(pointA.latitude - pointB.latitude, 2) +
                   Math.pow(pointA.longitude - pointB.longitude, 2));
}