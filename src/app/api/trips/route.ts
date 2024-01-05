import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { createRoom, initializeStorage, getStorage } from "@/lib/liveblocks";
import prisma from "@/lib/db";

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

export async function POST() {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const trip = await prisma.trip.create({ data: { userId } });

  const tripId = trip.id;

  await createRoom(tripId, ["room:write"]);

  const storage = {
    trip: {
      liveblocksType: "LiveObject",
      data: {
        name: "New Trip",
        places: {
          liveblocksType: "LiveList",
          data: [],
        },
      },
    },
  };

  await initializeStorage(tripId, storage);

  return NextResponse.json({ tripId }, { status: 200 });
}
