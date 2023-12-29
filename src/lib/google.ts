import { placesAutocompleteResponseSchema } from "@/lib/schemas";

const KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function placeAutocomplete(input: string) {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${KEY}&types=(regions)`;

  const response = await fetch(url, { method: "GET" });

  const data: unknown = await response.json();

  const parsedData = placesAutocompleteResponseSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Google places autocomplete error");
  }

  return parsedData.data;
}
