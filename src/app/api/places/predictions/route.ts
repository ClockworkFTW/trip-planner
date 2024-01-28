import { NextRequest, NextResponse } from "next/server";
import { getPlacePredictions } from "@/lib/google";
import { getErrorMessage, getSearchParams } from "@/util/api";
import { z } from "zod";

const paramsSchema = z.object({
  input: z.string(),
  types: z.string(),
});

export async function GET(request: NextRequest) {
  const params = getSearchParams(request);

  const parsedParams = paramsSchema.safeParse(params);

  if (!parsedParams.success) {
    return NextResponse.json({ message: "Invalid params" }, { status: 400 });
  }

  const { input, types } = parsedParams.data;

  try {
    const { status, predictions } = await getPlacePredictions(input, types);

    if (status !== "OK") {
      return NextResponse.json({ message: "No places found" }, { status: 400 });
    }

    const predictionsWithIds = predictions.filter(
      (prediction) => prediction.place_id,
    );

    return NextResponse.json(
      { predictions: predictionsWithIds },
      { status: 200 },
    );
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ message }, { status: 400 });
  }
}
