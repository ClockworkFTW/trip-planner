import { z } from "zod";
import * as schema from "@/schemas/predictions";

export type Prediction = z.infer<typeof schema.placeAutocompletePrediction>;
