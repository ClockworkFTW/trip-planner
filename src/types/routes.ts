import { z } from "zod";
import * as schema from "@/schemas/routes";

export type Route = z.infer<typeof schema.route>;
