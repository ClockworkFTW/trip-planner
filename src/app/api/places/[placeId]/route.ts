import { NextRequest, NextResponse } from "next/server";
import { getPlaceDetails } from "@/lib/google";
import * as cache from "@/lib/cache";
import { getDescription, getPhotos } from "@/lib/serper";
import { getErrorMessage } from "@/lib/util";

export async function GET(request: NextRequest) {
  // TODO: find a better way to do this
  const placeId = request.nextUrl.pathname.split("/")[3];

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
