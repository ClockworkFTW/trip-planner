import { z } from "zod";
import * as schema from "@/schemas/predictions";

export type BasePrediction = z.infer<typeof schema.placeAutocompletePrediction>;

export type Prediction = BasePrediction & { place_id: string };
