import { NextRequest, NextResponse } from "next/server";
import { placeAutocomplete } from "@/lib/google";
import { getErrorMessage, getSearchParams } from "@/lib/util";
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
    const { status, predictions } = await placeAutocomplete(input, types);

    if (status !== "OK") {
      return NextResponse.json({ message: "No places found" }, { status: 400 });
    }

    return NextResponse.json({ predictions }, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ message }, { status: 400 });
  }
}
