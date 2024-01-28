import { NextRequest, NextResponse } from "next/server";
import { getPlaceDetails } from "@/lib/google";
import { getDescription, getPhotos } from "@/lib/serper";
import { getErrorMessage, getSearchParams } from "@/utils/api";
import * as cache from "@/lib/cache";
import { z } from "zod";

const paramsSchema = z.object({
  placeId: z.string(),
});

export async function GET(request: NextRequest) {
  const params = getSearchParams(request);

  const parsedParams = paramsSchema.safeParse(params);

  if (!parsedParams.success) {
    return NextResponse.json({ message: "Invalid params" }, { status: 400 });
  }

  const { placeId } = parsedParams.data;

  try {
    const place = await getPlaceDetails(placeId);

    if (!place.editorialSummary) {
      const cachedDescription = await cache.getDescription(placeId);

      if (cachedDescription) {
        place.editorialSummary = cachedDescription;
      } else {
        const description = await getDescription(place.formattedAddress);

        if (description) {
          await cache.setDescription(placeId, description);
          place.editorialSummary = description;
        }
      }
    }

    const cachedPhotos = await cache.getPhotos(placeId);

    if (cachedPhotos) {
      place.photos = [...cachedPhotos, ...place.photos];
    } else {
      const photos = await getPhotos(place.formattedAddress);
      await cache.setPhotos(placeId, photos);
      place.photos = [...photos, ...place.photos];
    }

    return NextResponse.json({ place }, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ message }, { status: 400 });
  }
}
