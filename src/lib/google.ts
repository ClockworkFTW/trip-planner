import { placesAutocompleteResponseSchema, placeSchema } from "@/lib/schemas";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function placeAutocomplete(input: string, types: string) {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=${types}&key=${API_KEY}`;

  const response = await fetch(url, { method: "GET" });

  const data: unknown = await response.json();

  const parsedData = placesAutocompleteResponseSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Google places autocomplete error");
  }

  return parsedData.data;
}

export async function placeDetails(placeId: string) {
  const fields = [
    "id",
    "displayName",
    "formattedAddress",
    "googleMapsUri",
    "location",
    "viewport",
    "types",
  ].join(",");

  const url = `https://places.googleapis.com/v1/places/${placeId}?fields=${fields}&languageCode=en&&key=${API_KEY}`;

  const response = await fetch(url, { method: "GET" });

  const data: unknown = await response.json();

  const parsedData = placeSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Google places details error");
  }

  return parsedData.data;
}
