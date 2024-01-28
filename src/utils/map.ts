import type { Location } from "@/types/places";

export function getBounds(locations: Location[]) {
  if (locations.length === 0) {
    throw new Error("Input array is empty");
  }

  let minLat = locations[0].latitude;
  let maxLat = locations[0].latitude;
  let minLng = locations[0].longitude;
  let maxLng = locations[0].longitude;

  for (const location of locations) {
    minLat = Math.min(minLat, location.latitude);
    maxLat = Math.max(maxLat, location.latitude);
    minLng = Math.min(minLng, location.longitude);
    maxLng = Math.max(maxLng, location.longitude);
  }

  const sw = { latitude: minLat, longitude: minLng };
  const ne = { latitude: maxLat, longitude: maxLng };

  return { sw, ne };
}

export function metersToMiles(meters: number) {
  const conversionRate = 0.000621371;
  const miles = meters * conversionRate;
  return Number(miles.toFixed(1));
}
