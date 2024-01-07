import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { createRoom, initializeStorage, getStorage } from "@/lib/liveblocks";
import prisma from "@/lib/db";
import { z } from "zod";
import { placeDetails } from "@/lib/google";
import { getBoundingBox } from "@/lib/util";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // TODO: get only trips where user is an owner or member
  const trips = await prisma.trip.findMany();

  const test = await Promise.all(
    trips.map(async (trip) => {
      const storage = await getStorage(trip.id);
      return { ...trip, ...storage.trip };
    }),
  );

  return NextResponse.json({ trips: test }, { status: 200 });
}

const bodySchema = z.object({
  placeIds: z.array(z.string()),
  startDate: z.string(),
  endDate: z.string(),
});

export async function POST(request: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body: unknown = await request.json();

  const parsedBody = bodySchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }

  const trip = await prisma.trip.create({ data: { userId } });

  const tripId = trip.id;

  await createRoom(tripId, ["room:write"]);

  const { placeIds, startDate, endDate } = parsedBody.data;

  const places = await Promise.all(
    placeIds.map((placeId) => placeDetails(placeId)),
  );

  const title =
    "Trip to " + places.map((place) => place.displayName.text).join(" and ");

  const boundingBox = getBoundingBox(places.map((place) => place.location));

  const storage = {
    trip: {
      liveblocksType: "LiveObject",
      data: {
        title,
        startDate,
        endDate,
        bounds: {
          liveblocksType: "LiveObject",
          data: {
            sw: {
              liveblocksType: "LiveObject",
              data: boundingBox.sw,
            },
            ne: {
              liveblocksType: "LiveObject",
              data: boundingBox.ne,
            },
          },
        },
        itinerary: {
          liveblocksType: "LiveList",
          data: [],
        },
      },
    },
  };

  await initializeStorage(tripId, storage);

  return NextResponse.json({ tripId }, { status: 200 });
}
