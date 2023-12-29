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
