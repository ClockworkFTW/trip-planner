import { NextRequest, NextResponse } from "next/server";
import { getPlaceDetails, getPlaceRecommendations } from "@/lib/google";
import { getErrorMessage, getSearchParams } from "@/utils/api";
import { getBounds } from "@/utils/map";
import { z } from "zod";

const paramsSchema = z.object({
  placeId: z.string(),
  type: z.string(),
});

export async function GET(request: NextRequest) {
  const params = getSearchParams(request);

  const parsedParams = paramsSchema.safeParse(params);

  if (!parsedParams.success) {
    return NextResponse.json({ message: "Invalid params" }, { status: 400 });
  }

  const { placeId, type } = parsedParams.data;

  try {
    const { viewport, formattedAddress } = await getPlaceDetails(placeId);

    const places = await getPlaceRecommendations(
      formattedAddress,
      type,
      viewport,
    );

    const locations = places.map((place) => place.location);

    const bounds = getBounds(locations);

    return NextResponse.json({ places, bounds }, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ message }, { status: 400 });
  }
}
