import { z } from "zod";

import { placeAutocompletePredictionSchema } from "@/lib/schemas";

export type PlaceAutocompletePrediction = z.infer<
  typeof placeAutocompletePredictionSchema
>;
