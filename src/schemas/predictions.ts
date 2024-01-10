import { z } from "zod";

export const placeAutocompleteMatchedSubstring = z.object({
  length: z.number(),
  offset: z.number(),
});

export const placeAutocompleteStructuredFormat = z.object({
  main_text: z.string(),
  main_text_matched_substrings: z.array(placeAutocompleteMatchedSubstring),
  secondary_text: z.string().optional(),
  secondary_text_matched_substrings: z
    .array(placeAutocompleteMatchedSubstring)
    .optional(),
});

export const placeAutocompleteTerm = z.object({
  offset: z.number(),
  value: z.string(),
});

export const placeAutocompletePrediction = z.object({
  description: z.string(),
  matched_substrings: z.array(placeAutocompleteMatchedSubstring),
  structured_formatting: placeAutocompleteStructuredFormat,
  terms: z.array(placeAutocompleteTerm),
  distance_meters: z.number().optional(),
  place_id: z.string().optional(),
  types: z.array(z.string()).optional(),
});

export const placesAutocompleteStatus = z.enum([
  "OK",
  "ZERO_RESULTS",
  "INVALID_REQUEST",
  "OVER_QUERY_LIMIT",
  "REQUEST_DENIED",
  "UNKNOWN_ERROR",
]);

export const placesAutocompleteResponse = z.object({
  predictions: z.array(placeAutocompletePrediction),
  status: placesAutocompleteStatus,
});
