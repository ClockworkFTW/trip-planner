import { z } from "zod";

import { placeAutocompletePredictionSchema, placeSchema } from "@/lib/schemas";

export type Prediction = z.infer<typeof placeAutocompletePredictionSchema>;

export type Place = z.infer<typeof placeSchema>;
