import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const trips = await prisma.trip.findMany({ where: { userId } });

  const test = await Promise.all(
    trips.map(async (trip) => {
      const result = await fetch(
        `https://api.liveblocks.io/v2/rooms/${trip.id}/storage?format=json`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY}`,
          },
        },
      );
      const data = await result.json();
      return { ...trip, data };
    }),
  );

  return NextResponse.json({ trips: test }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const trip = await prisma.trip.create({ data: { userId } });

  const tripId = trip.id;

  // Create room
  const room = {
    id: tripId,
    defaultAccesses: ["room:write"],
  };

  await fetch("https://api.liveblocks.io/v2/rooms", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY}` },
    body: JSON.stringify(room),
  });

  // Initialize storage
  const { name } = await request.json();

  const storage = {
    liveblocksType: "LiveObject",
    data: { name },
  };

  await fetch(`https://api.liveblocks.io/v2/rooms/${tripId}/storage`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY}` },
    body: JSON.stringify(storage),
  });

  return NextResponse.json({ tripId }, { status: 200 });
}
