import { z } from "zod";

import { placeAutocompletePredictionSchema, placeSchema } from "@/lib/schemas";

export type PlaceAutocompletePrediction = z.infer<
  typeof placeAutocompletePredictionSchema
>;

export type Place = z.infer<typeof placeSchema>;
