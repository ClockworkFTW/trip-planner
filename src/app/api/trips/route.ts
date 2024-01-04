import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { createRoom, initializeStorage, getStorage } from "@/lib/liveblocks";
import prisma from "@/lib/db";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const trips = await prisma.trip.findMany({ where: { userId } });

  const test = await Promise.all(
    trips.map(async (trip) => {
      const storage = await getStorage(trip.id);
      return { ...trip, storage };
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

  await initializeStorage(tripId, { name: "New Trip" });

  return NextResponse.json({ tripId }, { status: 200 });
}
