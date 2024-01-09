import { z } from "zod";

export const placeAutocompleteMatchedSubstringSchema = z.object({
  length: z.number(),
  offset: z.number(),
});

export const placeAutocompleteStructuredFormatSchema = z.object({
  main_text: z.string(),
  main_text_matched_substrings: z.array(
    placeAutocompleteMatchedSubstringSchema,
  ),
  secondary_text: z.string().optional(),
  secondary_text_matched_substrings: z
    .array(placeAutocompleteMatchedSubstringSchema)
    .optional(),
});

export const placeAutocompleteTermSchema = z.object({
  offset: z.number(),
  value: z.string(),
});

export const placeAutocompletePredictionSchema = z.object({
  description: z.string(),
  matched_substrings: z.array(placeAutocompleteMatchedSubstringSchema),
  structured_formatting: placeAutocompleteStructuredFormatSchema,
  terms: z.array(placeAutocompleteTermSchema),
  distance_meters: z.number().optional(),
  place_id: z.string().optional(),
  types: z.array(z.string()).optional(),
});

export const placesAutocompleteStatusSchema = z.enum([
  "OK",
  "ZERO_RESULTS",
  "INVALID_REQUEST",
  "OVER_QUERY_LIMIT",
  "REQUEST_DENIED",
  "UNKNOWN_ERROR",
]);

export const placesAutocompleteResponseSchema = z.object({
  predictions: z.array(placeAutocompletePredictionSchema),
  status: placesAutocompleteStatusSchema,
});

// Place

export const localizedTextSchema = z.object({
  text: z.string(),
  languageCode: z.string(),
});

export const latLngSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const viewportSchema = z.object({
  low: latLngSchema,
  high: latLngSchema,
});

export const authorAttributionSchema = z.object({
  displayName: z.string(),
  uri: z.string(),
  photoUri: z.string(),
});

export const photoSchema = z.object({
  name: z.string(),
  widthPx: z.number(),
  heightPx: z.number(),
  authorAttributions: z.array(authorAttributionSchema),
});

export const placeSchema = z.object({
  id: z.string(),
  photos: z.array(photoSchema),
  displayName: localizedTextSchema,
  formattedAddress: z.string(),
  googleMapsUri: z.string(),
  location: latLngSchema,
  viewport: viewportSchema,
  types: z.array(z.string()),
  editorialSummary: localizedTextSchema.optional(),
});
