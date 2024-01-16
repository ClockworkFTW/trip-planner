import { NextRequest, NextResponse } from "next/server";
import { getPlaceDetails } from "@/lib/google";
import {
  getCachedDescription,
  getCachedPhotos,
  setCachedDescription,
  setCachedPhotos,
} from "@/lib/cache";
import { getDescription, getPhotos } from "@/lib/serper";
import { getErrorMessage } from "@/lib/util";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(request: NextRequest) {
  // TODO: find a better way to do this
  const placeId = request.nextUrl.pathname.split("/")[3];

  try {
    const place = await getPlaceDetails(placeId);

    if (!place.editorialSummary) {
      noStore();
      const cachedDescription = await getCachedDescription(placeId);

      if (cachedDescription) {
        place.editorialSummary = cachedDescription;
      } else {
        const description = await getDescription(place.formattedAddress);

        if (description) {
          await setCachedDescription(placeId, description);
          place.editorialSummary = description;
        }
      }
    }

    noStore();
    const cachedPhotos = await getCachedPhotos(placeId);

    if (cachedPhotos) {
      place.photos = [...cachedPhotos, ...place.photos];
    } else {
      const photos = await getPhotos(place.formattedAddress);
      await setCachedPhotos(placeId, photos);
      place.photos = [...photos, ...place.photos];
    }

    const photos = await getPhotos(place.formattedAddress);

    place.photos = [...photos, ...place.photos];

    return NextResponse.json({ place }, { status: 200 });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ message }, { status: 400 });
  }
}
