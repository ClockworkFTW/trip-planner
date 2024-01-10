import * as predictionsSchema from "@/schemas/predictions";
import * as placesSchema from "@/schemas/places";
import * as routesSchema from "@/schemas/routes";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY!;

export async function getPlacePredictions(input: string, types: string) {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}${
    types === "all" ? "" : "&types=" + types
  }&key=${API_KEY}`;

  const response = await fetch(url, { method: "GET" });

  const data: unknown = await response.json();

  const parsedData =
    predictionsSchema.placesAutocompleteResponse.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Google places autocomplete error");
  }

  return parsedData.data;
}

export async function getPlaceDetails(placeId: string) {
  const fields = [
    "id",
    "photos",
    "displayName",
    "formattedAddress",
    "googleMapsUri",
    "location",
    "viewport",
    "types",
    "editorialSummary",
  ].join(",");

  const url = `https://places.googleapis.com/v1/places/${placeId}?fields=${fields}&languageCode=en&key=${API_KEY}`;

  const response = await fetch(url, { method: "GET" });

  const data: unknown = await response.json();

  const parsedData = placesSchema.place.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Google places details error");
  }

  return parsedData.data;
}

export async function getRoutes(
  placeIdA: string,
  placeIdB: string,
  travelMode: string,
) {
  const url = `https://routes.googleapis.com/directions/v2:computeRoutes`;

  const fieldMask =
    "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline";

  const headers = new Headers();
  headers.set("X-Goog-Api-Key", API_KEY);
  headers.set("X-Goog-FieldMask", fieldMask);

  const body = JSON.stringify({
    origin: { placeId: placeIdA },
    destination: { placeId: placeIdB },
    travelMode,
  });

  const response = await fetch(url, { method: "POST", headers, body });

  const data: unknown = await response.json();

  const parsedData = routesSchema.computeRoutesResponse.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Google maps routes error");
  }

  return parsedData.data;
}
