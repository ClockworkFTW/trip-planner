import { NextRequest } from "next/server";

export function getErrorMessage(error: unknown) {
  let message;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
}

export function getSearchParams(request: NextRequest) {
  let data: { [key: string]: string } = {};
  request.nextUrl.searchParams.forEach((value, key) => (data[key] = value));
  return data;
}

type Location = { latitude: number; longitude: number };

export function getBoundingBox(locations: Location[]) {
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

  const sw = { lat: minLat, lng: minLng };
  const ne = { lat: maxLat, lng: maxLng };

  return { sw, ne };
}
