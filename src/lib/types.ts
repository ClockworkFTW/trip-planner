import { z } from "zod";

import {
  placeAutocompletePredictionSchema,
  placeSchema,
  latLngSchema,
  photoSchema,
} from "@/lib/schemas";

export type Prediction = z.infer<typeof placeAutocompletePredictionSchema>;

export type Place = z.infer<typeof placeSchema>;

export type Photo = z.infer<typeof photoSchema>;

export type Location = z.infer<typeof latLngSchema>;

export type Bounds = { sw: Location; ne: Location };
