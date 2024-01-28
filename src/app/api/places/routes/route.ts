import { NextRequest, NextResponse } from "next/server";
import { getRoutes } from "@/lib/google";
import { getErrorMessage, getSearchParams } from "@/utils/api";
import { z } from "zod";

const paramsSchema = z.object({
  placeIdA: z.string(),
  placeIdB: z.string(),
  travelMode: z.string(),
});

export async function GET(request: NextRequest) {
  const params = getSearchParams(request);

  const parsedParams = paramsSchema.safeParse(params);

  if (!parsedParams.success) {
    return NextResponse.json({ message: "Invalid params" }, { status: 400 });
  }

  const { placeIdA, placeIdB, travelMode } = parsedParams.data;

  try {
    const routes = await getRoutes(placeIdA, placeIdB, travelMode);
    return NextResponse.json(routes, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ message }, { status: 400 });
  }
}
