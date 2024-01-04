import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { getStorage, deleteRoom } from "@/lib/liveblocks";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // TODO: find a better way to do this
  const tripId = request.nextUrl.pathname.split("/")[3];

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });

  if (!trip) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const storage = await getStorage(tripId);

  return NextResponse.json(
    { trip: { ...trip, ...storage.trip } },
    { status: 200 },
  );
}

export async function DELETE(request: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // TODO: find a better way to do this
  const tripId = request.nextUrl.pathname.split("/")[3];

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });

  if (!trip) {
    return new NextResponse("Not Found", { status: 404 });
  }

  await prisma.trip.delete({ where: { id: tripId } });

  await deleteRoom(tripId);

  return NextResponse.json({ message: "Trip deleted" }, { status: 200 });
}
