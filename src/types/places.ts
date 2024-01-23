import { z } from "zod";
import * as schema from "@/schemas/places";

export type Place = z.infer<typeof schema.place>;

export type LocalizedText = z.infer<typeof schema.localizedText>;

export type Photo = z.infer<typeof schema.photo>;

export type Location = z.infer<typeof schema.location>;

export type Viewport = z.infer<typeof schema.viewport>;

export type Bounds = { sw: Location; ne: Location };
